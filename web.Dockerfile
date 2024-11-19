FROM oven/bun:1 AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile && bun run build

FROM oven/bun:1
WORKDIR /app

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["bun", "build/index.js"]
