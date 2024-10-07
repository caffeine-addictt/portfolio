use anyhow::Result;

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
    )
    .await
}
