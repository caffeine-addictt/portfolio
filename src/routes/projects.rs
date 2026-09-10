use std::sync::LazyLock;

use axum::{extract::State, response::Html};
use serde::{Deserialize, Serialize};

use crate::{routes::get_tera_ctx, AppConfig};

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

pub async fn featured_projects(State(cfg): State<AppConfig>) -> Html<String> {
    let mut ctx = get_tera_ctx();
    ctx.insert(
        "projects",
        &*PROJECTS.iter().take(2).collect::<Vec<&Project>>(),
    );
    Html(cfg.tera.render("components/project.html", &ctx).unwrap())
}

pub async fn projects(State(cfg): State<AppConfig>) -> Html<String> {
    let mut ctx = get_tera_ctx();
    ctx.insert("projects", &*PROJECTS);
    Html(cfg.tera.render("projects.html", &ctx).unwrap())
}
