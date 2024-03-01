ARG NODE_VERSION=21.6.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

WORKDIR /src

ENV NODE_ENV="production"


# Build the rust artifact
FROM rust:slim as rust

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl ca-certificates pkg-config \
    && apt-get autoremove -y \
    && apt-get clean -y

COPY . .

RUN cargo build --release
RUN ls target
RUN ls target/release


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl ca-certificates pkg-config \
    && apt-get autoremove -y \
    && apt-get clean -y

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /src /src
COPY --from=rust /target/release/libfib.so /src/index.node

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
