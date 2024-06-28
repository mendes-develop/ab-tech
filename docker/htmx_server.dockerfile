FROM oven/bun:1.0.22 as base
WORKDIR /app
COPY . .
RUN bun install
WORKDIR /app/packages/htmx_server
CMD ["bun", "dev"]
EXPOSE 4000