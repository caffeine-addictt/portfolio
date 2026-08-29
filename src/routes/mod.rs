use axum::{handler::HandlerWithoutStateExt, response::Redirect, routing::get, Router};
use chrono::{Datelike, Local};
use tower_http::services::ServeDir;

pub mod error;
mod index;

pub fn get_tera_ctx() -> tera::Context {
    let mut ctx = tera::Context::new();
    ctx.insert("year", &Local::now().year());
    ctx.insert("site_name", "ngjx.org");
    ctx
}

pub fn get_routes() -> Router {
    Router::new()
        .route("/", get(index::root_path))
        .route("/resume", get(async || Redirect::permanent("https://raw.githubusercontent.com/caffeine-addictt/caffeine-addictt/refs/heads/main/media/ng_jun_xiang_resume.pdf")))
        .nest_service("/img", ServeDir::new("public/images"))
        .nest_service("/css", ServeDir::new("public/css"))
        .fallback_service(
            ServeDir::new("public/root")
                .not_found_service(error::handle_lost.into_service()),
        )
}
