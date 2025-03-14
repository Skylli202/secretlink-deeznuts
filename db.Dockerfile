FROM alpine:latest

ARG PB_VERSION=0.25.9

RUN apk add --no-cache \
  unzip \
  ca-certificates \
  curl

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# /!\ Migration are shared to the docker container via a docker volumen in docker-compose.yaml
# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# /!\ Migration are shared to the docker container via a docker volumen in docker-compose.yaml
# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8090

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
