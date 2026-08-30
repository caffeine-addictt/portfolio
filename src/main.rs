use std::{sync::Arc, time::Duration};

use axum::{
    error_handling::HandleErrorLayer,
    extract::MatchedPath,
    http::{HeaderMap, Request, Response},
    Extension,
};
use tower::{buffer::BufferLayer, limit::RateLimitLayer, ServiceBuilder};
use tower_http::{classify::ServerErrorsFailureClass, trace::TraceLayer};
use tracing::{debug, error, info, info_span, Span};

mod config;
mod database;
mod routes;

#[tokio::main]
async fn main() -> anyhow::Result<(), anyhow::Error> {
    tracing_subscriber::fmt::init();
    dotenvy::dotenv().ok();

    let dev = std::env::var("DEV").is_ok_and(|s| s.to_lowercase() == "true");
    let url = std::env::var("TURSO_DB_URL").expect("TURSO_DB_URL is not set");
    let token = std::env::var("TURSO_DB_TOKEN").expect("TURSO_DB_TOKEN is not set");

    let db = Arc::new(database::Database::new(url.as_str(), token.as_str()).await?);

    let mut tera = tera::Tera::new();
    tera.load_from_glob("templates/**/*")
        .expect("creating tera templates to not error");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:80").await?;
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    Ok(axum::serve(
        listener,
        routes::get_routes(dev)
            .layer(
                ServiceBuilder::new()
                    .layer(HandleErrorLayer::new(routes::handle_error))
                    .layer(BufferLayer::new(1024))
                    .layer(RateLimitLayer::new(5, Duration::from_secs(1))),
            )
            .layer(Extension(tera))
            .layer(Extension(db.clone()))
            .layer(
                TraceLayer::new_for_http()
                    .make_span_with(|request: &Request<_>| {
                        let matched_path = request
                            .extensions()
                            .get::<MatchedPath>()
                            .map(MatchedPath::as_str);

                        info_span!(
                            "http_request",
                            method = ?request.method(),
                            matched_path,
                        )
                    })
                    .on_request(|_request: &Request<_>, _span: &Span| {
                        info!("request started");
                    })
                    .on_response(
                        |_response: &Response<_>, _latency: Duration, _span: &Span| {
                            info!("request complete");
                        },
                    )
                    .on_eos(
                        |_trailers: Option<&HeaderMap>,
                         _stream_duration: Duration,
                         _span: &Span| { debug!("stream closed") },
                    )
                    .on_failure(
                        |_error: ServerErrorsFailureClass, _latency: Duration, _span: &Span| {
                            let e = _error.to_string();
                            error!(e, "request failed");
                        },
                    ),
            )
            .with_state(app_cfg),
    )
    .with_graceful_shutdown(config::shutdown_signal())
    .await?)
}
