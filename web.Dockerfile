FROM oven/bun:1 AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile && bun run build

FROM oven/bun:1 AS runner
WORKDIR /app

COPY --from=builder /app/build ./build
COPY ./package.json .
COPY ./bun.lockb .
RUN bun install --frozen-lockfile --production

EXPOSE 3000
CMD [ "bun", "build/index.js"]
