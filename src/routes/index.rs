use axum::{response::Html, Extension};
use chrono::{Datelike, Local, NaiveDate};
use serde::{Deserialize, Serialize};
use std::sync::LazyLock;
use tracing::instrument;

use crate::routes::get_tera_ctx;

static WORK: LazyLock<Vec<TimelineGroup>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../../data/work.json"))
        .expect("failed to parse data/work.json")
});
static EDU: LazyLock<Vec<TimelineGroup>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../../data/education.json"))
        .expect("failed to parse data/education.json")
});

#[instrument]
pub async fn root_path(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    let mut ctx = get_tera_ctx();

    let today = Local::now().date_naive();
    let birth = NaiveDate::from_ymd_opt(2006, 9, 30).unwrap();
    let age = today.year()
        - birth.year()
        - ((today.month(), today.day()) < (birth.month(), birth.day())) as i32;
    ctx.insert("age", &age);

    ctx.insert("work", &*WORK);
    ctx.insert("edu", &*EDU);

    Html(tera.render("index.html", &ctx).unwrap())
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TimelineGroup {
    pub logo: String,
    pub site_link: String,

    pub name_short: String,
    pub name_long: String,

    pub items: Vec<TimelineItem>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TimelineItem {
    pub sub_title: String,
    pub duration_flavor: String,
    pub description: Vec<String>,

    pub links: Vec<TimelineItemLink>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TimelineItemLink {
    pub name: String,
    pub link: String,
}
