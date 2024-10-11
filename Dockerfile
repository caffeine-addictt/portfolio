FROM rust:1.81.0-slim-bookworm AS builder
WORKDIR /app

# cache
COPY Cargo.lock Cargo.toml ./
RUN \
  --mount=type=cache,target=/app/target/ \
  --mount=type=cache,target=/usr/local/cargo/registry/ \
  mkdir src \
  && echo "fn main() {}" > src/main.rs \
  && cargo fetch \
  && rm -rf src

# build
COPY src ./src
RUN \
  --mount=type=cache,target=/app/target/ \
  --mount=type=cache,target=/usr/local/cargo/registry/ \
  cargo build --release \
  && cp ./target/release/portfolio /


FROM debian:bookworm-slim AS deploy
WORKDIR /opt/app

RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "10001" \
  appuser

COPY --from=builder /portfolio /usr/local/bin
RUN chown appuser /usr/local/bin/portfolio && chown -R appuser /opt/app

COPY templates ./templates/

USER appuser
ENV RUST_LOG="portfolio=debug,info"

EXPOSE 3000
ENTRYPOINT ["portfolio"]
