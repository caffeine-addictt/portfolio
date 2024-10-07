use axum::{response::Html, routing::get, Extension, Router};
use tower_http::services::ServeDir;
use tracing::instrument;

pub fn get_routes() -> Router {
    Router::new()
        .route("/", get(root_path))
        .nest_service("/static", ServeDir::new("public"))
}

#[instrument]
async fn root_path(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    Html(tera.render("index.html", &tera::Context::new()).unwrap())
}
