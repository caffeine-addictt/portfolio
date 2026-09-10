use std::time::Duration;

use anyhow::Result;
use tokio::task::JoinHandle;
use turso::sync::{Builder, Database as TursoDatabase};

mod migrate;

pub(crate) struct Database {
    inner: TursoDatabase,
    sync_task: JoinHandle<()>,
}

impl Database {
    pub async fn new(url: impl Into<String>, token: impl Into<String>) -> Result<Self> {
        let inner = Builder::new_remote("app.db")
            .with_remote_url(url)
            .with_auth_token(token)
            .bootstrap_if_empty(true)
            .build()
            .await?;

        inner.pull().await?;

        migrate::migrate(&inner).await?;

        inner.push().await?;

        let sync_db = inner.clone();

        let sync_task = tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(30));

            loop {
                interval.tick().await;

                if let Err(err) = sync_db.push().await {
                    tracing::error!(?err, "database push failed");
                }

                if let Err(err) = sync_db.pull().await {
                    tracing::error!(?err, "database pull failed");
                }
            }
        });

        Ok(Self { inner, sync_task })
    }

    pub async fn push(&self) -> Result<()> {
        self.inner.push().await?;
        Ok(())
    }

    pub async fn pull(&self) -> Result<bool> {
        Ok(self.inner.pull().await?)
    }

    pub async fn checkpoint(&self) -> Result<()> {
        self.inner.checkpoint().await?;
        Ok(())
    }

    pub async fn sync(&self) -> Result<bool> {
        self.push().await?;
        self.pull().await
    }

    pub async fn connection(&self) -> Result<turso::Connection> {
        Ok(self.inner.connect().await?)
    }

    pub async fn shutdown(&self) -> Result<()> {
        self.sync_task.abort();

        self.inner.push().await?;
        self.inner.checkpoint().await?;

        Ok(())
    }
}

impl Drop for Database {
    fn drop(&mut self) {
        self.sync_task.abort();
    }
}
