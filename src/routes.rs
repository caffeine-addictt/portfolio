use axum::{
    response::{Html, Redirect},
    routing::get,
    Extension, Router,
};
use chrono::{Datelike, Local, NaiveDate};
use serde::{Deserialize, Serialize};
use tower_http::services::ServeDir;
use tracing::instrument;

pub fn get_tera_ctx() -> tera::Context {
    let mut ctx = tera::Context::new();
    ctx.insert("year", &Local::now().year());
    ctx.insert("site_name", "ngjx.org");
    ctx
}

pub fn get_routes() -> Router {
    Router::new()
        .route("/", get(root_path))
        .route("/resume", get(async || Redirect::permanent("https://raw.githubusercontent.com/caffeine-addictt/caffeine-addictt/refs/heads/main/media/ng_jun_xiang_resume.pdf")))
        .nest_service("/img", ServeDir::new("public/images"))
        .nest_service("/css", ServeDir::new("public/css"))
        .fallback_service(ServeDir::new("public/root"))
}

#[instrument]
async fn root_path(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    let mut ctx = get_tera_ctx();

    let today = Local::now().date_naive();
    let birth = NaiveDate::from_ymd_opt(2006, 9, 30).unwrap();
    let age = today.year()
        - birth.year()
        - ((today.month(), today.day()) < (birth.month(), birth.day())) as i32;

    ctx.insert("age", &age);

    // work / experience
    let experiences: Vec<Experience> = vec![Experience {
        logo: String::from("img/vercel.svg"),
        company: String::from("Vercel"),
        url: String::from("https://vercel.com"),
        period: String::from("2022 - now"),
        role: String::from("Software Engineer"),
        description: Some(vec!["test1".to_string(), "test2".to_string()]),
        tags: Some(vec!["test1".to_string(), "test2".to_string()]),
    }];
    ctx.insert("experiences", &experiences);

    Html(tera.render("index.html", &ctx).unwrap())
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Experience {
    logo: String,
    company: String,
    url: String,
    period: String,
    role: String,
    description: Option<Vec<String>>,
    tags: Option<Vec<String>>,
}

// type Experience struct {}
