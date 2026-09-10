use std::sync::LazyLock;

use anyhow::Error;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    BoxError,
};

use crate::{config, routes};

pub(crate) type Result<T, E = AppError> = std::result::Result<T, E>;

static TERA: LazyLock<tera::Tera> =
    LazyLock::new(|| config::gen_tera().expect("failed to init Tera"));

pub async fn handle_lost() -> Html<String> {
    Html(TERA.render("404.html", &routes::get_tera_ctx()).unwrap())
}
pub(crate) async fn handle_error(err: BoxError) -> impl IntoResponse {
    tracing::error!("middleware error: {err:#}");
    render_500()
}

pub struct AppError(anyhow::Error);

impl<E> From<E> for AppError
where
    E: Into<Error> + Send + Sync + 'static,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        tracing::error!("application error: {:#}", self.0);
        render_500()
    }
}

fn render_500() -> Response {
    match TERA.render("500.html", &routes::get_tera_ctx()) {
        Ok(body) => (StatusCode::INTERNAL_SERVER_ERROR, Html(body)).into_response(),

        Err(err) => {
            tracing::error!("failed to render 500 page: {err:#}");

            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Html("<h1>Internal Server Error</h1>"),
            )
                .into_response()
        }
    }
}
