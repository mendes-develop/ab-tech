# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.0.22 as base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
# Copy root package.json and lock file
# RUN ls -l /usr/src/app
# COPY ../../package.json ./
# COPY ../../bun.lockb ./

# WORKDIR /app/packages/htmx_server

COPY . ./


# # Copy the api-specific files
# COPY . .
# Copy the api-specific package.json
# COPY /packages/htmx_server/package.json ./packages/htmx_server/
# # Install dependencies
RUN bun install
EXPOSE 4000

# it orks, but 
# CMD [ "ls", "./" ]
# CMD [ "ls", "./packages/htmx_server/public" ]
CMD ["bun", "run",  "start"]
