use axum::{
    response::{Html, Redirect},
    routing::get,
    Extension, Router,
};
use chrono::{Datelike, Local, NaiveDate};
use tower_http::services::ServeDir;
use tracing::instrument;

pub fn get_routes() -> Router {
    Router::new()
        .route("/", get(root_path))
        .route("/resume", get(async || Redirect::permanent("https://raw.githubusercontent.com/caffeine-addictt/caffeine-addictt/refs/heads/main/media/ng_jun_xiang_resume.pdf")))
        .nest_service("/static", ServeDir::new("public"))
}

#[instrument]
async fn root_path(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    let mut ctx = tera::Context::new();

    let today = Local::now().date_naive();
    let birth = NaiveDate::from_ymd_opt(2006, 9, 30).unwrap();
    let age = today.year()
        - birth.year()
        - ((today.month(), today.day()) < (birth.month(), birth.day())) as i32;

    ctx.insert("age", &age);
    Html(tera.render("index.html", &ctx).unwrap())
}
