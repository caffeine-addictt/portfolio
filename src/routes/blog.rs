use std::sync::Arc;

use axum::{response::Html, Extension};
use serde::{Deserialize, Serialize};

use crate::routes::{get_tera_ctx, Result};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct BlogPost {
    title: String,
    sub_title: String,
    body: String,
    lcp_img_url: Option<String>,

    /// serialized and stored as a [String] w/ [serde] from [Vec<String>]
    tags: Vec<String>,
    /// serialized and stored as a [String] w/ [serde] from [chrono::NaiveDate]
    published_at: Option<String>,
    /// serialized and stored as a [String] w/ [serde] from [PostStatus]
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
            body,
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
            body: row.get::<String>(2)?,
            lcp_img_url: None,
            tags: serde_json::from_str(&row.get::<String>(3)?)?,
            published_at: row
                .get::<Option<String>>(4)?
                .map(|s| {
                    chrono::NaiveDate::parse_from_str(&s, "%Y-%m-%d")
                        .map(|date| date.format("%b %Y").to_string())
                })
                .transpose()?,
            status: "published".into(),
            view_count: row.get::<i64>(5)?,
        });
    }

    let mut ctx = get_tera_ctx();
    ctx.insert("posts", &posts);
    ctx.insert("not_found_msg", "Stay tuned for some posts! :p");
    Ok(Html(tera.render("components/post.html", &ctx)?))
}
