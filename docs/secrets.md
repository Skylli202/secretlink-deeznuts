# Secrets

## Web application secrets

- `PB_URL`: URL of the [PocketBase](https://pocketbase.io) instance the
  SvelteKit application shall connect to.
- `PB_ADMIN_EMAIL`: Email of the pocketbase's superuser the SvelteKit
  application will use to authentication itself to the PocketBase instance.
- `PB_ADMIN_PASSWORD`: Password of the pocketbase's superuser the SvelteKit
  application will use to authentication itself to the PocketBase instance.

The secrets are stored in the `.env` file.
The `.env` file is used in the `docker-compose.yaml` file, for the `svkit` container.
The `svkit` container use the [env_file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute)
attribute.

> In the monolith server setup, both `svkit` and `pb` container are executed on
> the same host. All containers are automically added in the single docker's network.
> Because of this, in this scenario, the `PB_URL` usually looks like `http://pb:8090`.
