FROM node:22-alpine AS builder

WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/build ./build
# we copy the package json so that it knows the module type
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
RUN npm ci --omit dev


# set NODE_ENV environment variable to production
ENV NODE_ENV=production

# run app
EXPOSE 3000
CMD ["node", "build"]

