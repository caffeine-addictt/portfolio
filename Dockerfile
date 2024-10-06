FROM rust:1.81.0-slim AS builder
WORKDIR /app

# use musl
# RUN \
#   rustup target add x86_64-unknown-linux-musl \
#   && rustup default x86_64-unknown-linux-musl

# cache deps
COPY Cargo.toml Cargo.lock ./
RUN \
  mkdir src \
  && echo "fn main() {}" > src/main.rs \
  && RUSTFLAGS='-C target-feature=+crt-static' cargo build --release --target x86_64-unknown-linux-gnu \
  && rm -rf src

COPY src ./src
RUN RUSTFLAGS='-C target-feature=+crt-static' cargo build --release --target x86_64-unknown-linux-gnu \
  && strip target/x86_64-unknown-linux-gnu/release/portfolio

FROM gcr.io/distroless/base-debian12:nonroot AS deploy
WORKDIR /

COPY --from=builder /app/target/x86_64-unknown-linux-gnu/release/portfolio /portfolio

EXPOSE 3000

ENTRYPOINT [ "./portfolio" ]
