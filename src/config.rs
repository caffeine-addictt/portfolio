use anyhow::Context;
use tera::Tera;
use tokio::signal;
use tracing::info;

pub async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };
    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    tokio::select! {
        () = ctrl_c => {},
        () = terminate => {},
    }
    info!("Terminate signal received");
}

fn reading_time(value: &str, _: tera::Kwargs, _: &tera::State) -> String {
    let words = value.split_whitespace().count();
    let minutes = words.div_ceil(200).max(1);

    minutes.to_string()
}

pub fn gen_tera() -> anyhow::Result<Tera> {
    let mut tera = Tera::new();
    tera.register_filter("reading_time", reading_time);
    tera.load_from_glob("templates/**/*")
        .context("loeading tera templates")?;
    Ok(tera)
}
