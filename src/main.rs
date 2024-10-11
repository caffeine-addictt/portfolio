use std::time::Duration;

use anyhow::Result;
use axum::{
    error_handling::HandleErrorLayer,
    extract::MatchedPath,
    http::{HeaderMap, Request, Response, StatusCode},
    BoxError, Extension,
};
use tower::{buffer::BufferLayer, limit::RateLimitLayer, ServiceBuilder};
use tower_http::{classify::ServerErrorsFailureClass, trace::TraceLayer};
use tracing::{debug, error, info, info_span, Span};

mod config;
mod routes;

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    // logging
    tracing_subscriber::fmt::init();

    // templates
    let tera = tera::Tera::new("templates/**/*").expect("creating tera templates to not error");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(
        listener,
        routes::get_routes()
            .layer(Extension(tera))
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
            .layer(
                ServiceBuilder::new()
                    .layer(HandleErrorLayer::new(|err: BoxError| async move {
                        (
                            StatusCode::INTERNAL_SERVER_ERROR,
                            format!("Unhandled error: {}", err),
                        )
                    }))
                    .layer(BufferLayer::new(1024))
                    .layer(RateLimitLayer::new(5, Duration::from_secs(1))),
            ),
    )
    .with_graceful_shutdown(config::shutdown_signal())
    .await
}
