use anyhow::{Context, Error};
use include_dir::{include_dir, Dir};
use turso::sync::Database;

static MIGRATIONS: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/migrations");

pub async fn migrate(db: &Database) -> Result<(), Error> {
    let mut conn = db.connect().await?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS _migrations (
            version TEXT PRIMARY KEY,
            applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )",
        (),
    )
    .await
    .context("failed to create _migrations table")?;

    let mut migrations: Vec<_> = MIGRATIONS
        .files()
        .filter(|file| file.path().extension().is_some_and(|ext| ext == "sql"))
        .collect();

    migrations.sort_by_key(|file| file.path().to_owned());

    let mut rows = conn
        .query(
            "SELECT version FROM _migrations ORDER BY version DESC LIMIT 1",
            (),
        )
        .await
        .context("failed to query migrations")?;

    let latest = rows.next().await?.and_then(|row| row.get::<String>(0).ok());

    let start = match latest {
        Some(version) => migrations
            .iter()
            .position(|migration| {
                migration.path().file_stem().and_then(|s| s.to_str()) == Some(version.as_str())
            })
            .map(|i| i + 1)
            .with_context(|| format!("applied migration {version} is missing"))?,
        None => 0,
    };

    for migration in migrations.into_iter().skip(start) {
        let version = migration
            .path()
            .file_stem()
            .and_then(|s| s.to_str())
            .context("migration filename is not valid UTF-8")?;

        tracing::info!(migration = version, "applying migration");

        let tx = conn
            .transaction()
            .await
            .with_context(|| format!("failed to begin migration {version}"))?;

        tx.execute_batch(
            migration
                .contents_utf8()
                .context("migration is not valid UTF-8")?,
        )
        .await
        .with_context(|| format!("failed to execute migration {version}"))?;

        tx.execute("INSERT INTO _migrations (version) VALUES (?1)", [version])
            .await
            .with_context(|| format!("failed to record migration {version}"))?;

        tx.commit()
            .await
            .with_context(|| format!("failed to commit migration {version}"))?;

        tracing::info!(migration = version, "migration applied");
    }

    Ok(())
}
