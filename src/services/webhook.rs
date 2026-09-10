use reqwest::Client;
use serde::Serialize;
use tracing::info;

#[derive(Debug, Clone)]
pub struct WebhookService {
    client: Client,
    webhook_url: String,
}

#[derive(Serialize)]
/// [https://docs.discord.com/developers/resources/webhook#execute-webhook]
struct WebhookRequest {
    content: String,
}

impl WebhookService {
    pub fn new(webhook_url: impl Into<String>) -> Self {
        Self {
            client: Client::new(),
            webhook_url: webhook_url.into(),
        }
    }

    pub async fn send(
        &self,
        content: impl Into<String>,
    ) -> Result<reqwest::Response, reqwest::Error> {
        let content = content.into();
        info!("Sending webhook: {}", content);
        self.client
            .post(&self.webhook_url)
            .json(&WebhookRequest { content })
            .send()
            .await
    }
}
