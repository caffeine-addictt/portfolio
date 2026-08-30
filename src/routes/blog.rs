use std::sync::Arc;

use axum::{response::Html, Extension};
use serde::{Deserialize, Serialize};

use crate::routes::{get_tera_ctx, Result};

#[derive(Debug, Clone, Serialize)]
struct BlogPost {
    title: String,
    sub_title: String,
    body: String,
    lcp_img_url: Option<String>,

    tags: Vec<String>,
    published_at: Option<String>,
    status: String,
    view_count: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
enum PostStatus {
    Draft,
    Published,
    Hidden,
}

pub async fn recent_posts(
    Extension(tera): Extension<tera::Tera>,
    Extension(db): Extension<Arc<crate::database::Database>>,
) -> Result<Html<String>> {
    let conn = db.connection().await?;

    let mut rows = conn
        .query(
            r#"
        SELECT
            title,
            sub_title,
            tags,
            published_at,
            view_count
        FROM blog_posts
        WHERE status = 'published'
        ORDER BY published_at DESC
        LIMIT 2
        "#,
            (),
        )
        .await?;

    let mut posts = Vec::new();
    while let Some(row) = rows.next().await? {
        posts.push(BlogPost {
            title: row.get::<String>(0)?,
            sub_title: row.get::<String>(1)?,
            body: "".into(),
            lcp_img_url: None,
            tags: serde_json::from_str(&row.get::<String>(2)?)?,
            published_at: row.get::<Option<String>>(3)?,
            status: "published".into(),
            view_count: row.get::<i64>(4)?,
        });
    }

    let mut ctx = get_tera_ctx();
    ctx.insert("posts", &posts);
    Ok(Html(tera.render("components/post.html", &ctx)?))
}

// #[instrument]
// pub async fn projects(Extension(tera): Extension<tera::Tera>) -> Html<String> {
//     let mut ctx = get_tera_ctx();
//     ctx.insert("projects", &*PROJECTS);
//     Html(tera.render("projects.html", &ctx).unwrap())
// }
