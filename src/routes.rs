use axum::Router;
use tower_http::services::ServeDir;

pub fn get_routes() -> Router {
    Router::new().nest_service("/static", ServeDir::new("public"))
}
