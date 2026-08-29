use axum::{response::Html, Extension};
use tracing::instrument;

use crate::routes;

#[instrument]
pub async fn handle_lost(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    Html(tera.render("404.html", &routes::get_tera_ctx()).unwrap())
}
