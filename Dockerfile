FROM oven/bun as bun
WORKDIR /usr/src/app

FROM bun AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM bun AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN bun run build

FROM bun AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/ .

USER bun
EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "run", "dist/main.js" ]
