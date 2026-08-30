use std::sync::LazyLock;

use axum::{response::Html, Extension};
use serde::{Deserialize, Serialize};
use tracing::instrument;

use crate::routes::get_tera_ctx;

static PROJECTS: LazyLock<Vec<Project>> = LazyLock::new(|| {
    serde_json::from_str(include_str!("../../data/projects.json"))
        .expect("failed to parse data/projects.json")
});

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Project {
    img_url: String,
    name: String,
    description: String,
    source_url: String,
    website_url: String,
    technologies: Vec<String>,
}

#[instrument]
pub async fn featured_projects(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    let mut ctx = get_tera_ctx();
    ctx.insert(
        "projects",
        &*PROJECTS.iter().take(2).collect::<Vec<&Project>>(),
    );
    Html(tera.render("components/project.html", &ctx).unwrap())
}

#[instrument]
pub async fn projects(Extension(tera): Extension<tera::Tera>) -> Html<String> {
    let mut ctx = get_tera_ctx();
    ctx.insert("projects", &*PROJECTS);
    Html(tera.render("projects.html", &ctx).unwrap())
}
