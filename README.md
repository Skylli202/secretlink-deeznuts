# Secretlink DeezNuts

Secretlink-DeezNuts is yet another (boring) secret sharing application.
It is mostly a personal & side-project used as an excuse to explore
and play with some cool tech I love:
Svelte (and its meta-framework SvelteKit),
[shadcn-svelte](https://www.shadcn-svelte.com) and
[PocketBase](https://pocketbase.io).

## Roadmap & Ideas

> I'm not currently particularly actively developing this project at the moment.
> But development should resume one day or another.

- Implement user registration & login.
- Allow a user to list the secrets he generated and see the `viewCount`.

> If you have any feature request, idea or suggestion, please raise an issue!

## Develop

Start the PocketBase server:

```bash
./pocketbase serve
```

> The first time it will generate an installer link that should be
> automatically opened in the browser to setup your first superuser
> account (you can also create the first superuser manually via
> `./pocketbase superuser create EMAIL PASS`).

Once you've started the PocketBase server, installed the dependencies
with `npm install`, you can start the web application development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## (Re)Build docker images

Build the PocketBase image by executing:

```bash
docker build -f db.Dockerfile .

# or to build with the tag & push to repository
docker build -t skylli202/secretlink-deeznuts:pocketbase -f db.Dockerfile . --push
```

> The `db.Dockerfile` is based of PocketBase's documentation on
> [Going to production using Docker](https://pocketbase.io/docs/going-to-production/#using-docker)

Build the SvelteKit image by executing:

```bash
docker build -f web-node.Dockerfile .

# or to build with the tag & push to repository
docker build -t skylli202/secretlink-deeznuts:sveltekit -f web-node.Dockerfile . --push
```
