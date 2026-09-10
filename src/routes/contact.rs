use axum::{
    extract::{rejection::FormRejection, FromRequest, Request, State},
    response::Html,
    Form,
};
use serde::{de::DeserializeOwned, Deserialize};
use tracing::info;
use validator::Validate;

use crate::routes::{error::AppError, get_tera_ctx, Result};

pub async fn contact_page(State(cfg): State<crate::AppConfig>) -> Result<Html<String>> {
    Ok(Html(cfg.tera.render("contact.html", &get_tera_ctx())?))
}

#[derive(Debug, Deserialize, Validate)]
pub struct ContactForm {
    #[validate(length(min = 1))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 20))]
    pub message: String,
}

#[derive(Debug, Clone, Copy, Default)]
pub struct ValidatedForm<T>(pub T);

impl<T, S> FromRequest<S> for ValidatedForm<T>
where
    T: DeserializeOwned + Validate,
    S: Send + Sync,
    Form<T>: FromRequest<S, Rejection = FormRejection>,
{
    type Rejection = AppError;

    async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection> {
        let Form(value) = Form::<T>::from_request(req, state).await?;
        value.validate()?;
        Ok(ValidatedForm(value))
    }
}

#[axum::debug_handler]
pub async fn contact_submit_handler(
    State(cfg): State<crate::AppConfig>,
    ValidatedForm(form): ValidatedForm<ContactForm>,
) -> Result<Html<String>> {
    info!("new contact form submission: {form:#?}");

    let webhook_content = format!(
        "name: {}\nemail: {}\nmessage: {}",
        form.name, form.email, form.message
    );

    Ok(Html(match cfg
        .db
        .connection()
        .await?
        .execute(
            "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
            (form.name, form.email, form.message),
        )
        .await
    {
        Ok(_) => {
            match cfg.webhook.send(webhook_content).await {
                Ok(r) => {
                    if !r.status().is_success() {
                        tracing::error!("failed to send webhook: {}", r.status());
                    }
                }
                Err(e) => {
                    tracing::error!("failed to send webhook: {e:#}");
                }
            };

            let mut ctx = get_tera_ctx();
            ctx.insert("contact_result", &true);
            cfg.tera.render("partials/contact.html", &ctx)
        }
        Err(e) => {
            tracing::error!("failed to insert contact into database: {e:#}");

            let mut ctx = get_tera_ctx();
            ctx.insert("contact_result", &false);
            cfg.tera.render("partials/contact.html", &ctx)
        }
    }?))
}
