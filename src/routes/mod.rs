use axum::{handler::HandlerWithoutStateExt, response::Redirect, routing::get, Router};
use chrono::{Datelike, Local};
use tower_http::services::ServeDir;

mod blog;
mod error;
mod index;
mod projects;

pub(crate) use error::{handle_error, Result};

pub fn get_tera_ctx() -> tera::Context {
    let mut ctx = tera::Context::new();
    ctx.insert("year", &Local::now().year());
    ctx.insert("site_name", "ngjx.org");
    ctx
}

pub fn get_routes<T>(_dev: bool) -> Router<T>
where
    T: Clone + Send + Sync + 'static,
{
    Router::new()
        // index
        .route("/", get(index::root_path))
        .route("/featured-projects", get(projects::featured_projects))
        .route("/recent-posts", get(blog::recent_posts))
        // projects
        .route("/projects", get(projects::projects))
        // blog
        .route("/blog", get(blog::blog_page))
        .route("/blog/list", get(blog::get_blog_posts))
        // contact
        //
        .route("/resume", get(async || Redirect::permanent("https://raw.githubusercontent.com/caffeine-addictt/caffeine-addictt/refs/heads/main/media/ng_jun_xiang_resume.pdf")))
        .nest_service("/img", ServeDir::new("public/images"))
        .nest_service("/css", ServeDir::new("public/css"))
        .fallback_service(
            ServeDir::new("public/root")
                .not_found_service(error::handle_lost.into_service()),
        )
}
