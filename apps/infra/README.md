# @hc/infra — Local Infrastructure

Docker Compose setup for the local PostgreSQL 16 development database.

## Quick Start

1. Copy the environment template:
   ```bash
   cp apps/infra/.env.example apps/infra/.env
   ```

2. Start the database:
   ```bash
   pnpm dev:infra
   # or directly:
   docker compose -f apps/infra/docker-compose.yml up -d
   ```

3. Stop the database:
   ```bash
   pnpm stop:infra
   # or directly:
   docker compose -f apps/infra/docker-compose.yml down
   ```

## Connection String

```
postgresql://app_user:app_password@localhost:5432/hc_dev
```

Using psql:
```bash
psql postgresql://app_user:app_password@localhost:5432/hc_dev
```

## Environment Variables

| Variable            | Default        | Description              |
|---------------------|----------------|--------------------------|
| `POSTGRES_USER`     | `app_user`     | PostgreSQL username      |
| `POSTGRES_PASSWORD` | `app_password` | PostgreSQL password      |
| `POSTGRES_DB`       | `hc_dev`       | Database name            |
| `POSTGRES_PORT`     | `5432`         | Host port mapping        |

## Notes

- Data is persisted in the `hc_pgdata` Docker volume
- The service includes a health check (`pg_isready`) — dependent services should wait for `healthy` status
- `.env` is gitignored; only `.env.example` is committed
