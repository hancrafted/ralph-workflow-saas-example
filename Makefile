# ==============================================================================
# HC SaaS — Development Makefile
# ==============================================================================
# Usage:
#   make start   — Full setup: init + seed + dev
#   make init    — Install deps, start DB, run migrations
#   make seed    — Load sample data into the database
#   make dev     — Start all services for development
#   make stop    — Stop all running services
# ==============================================================================

SHELL := /bin/bash

# Docker Compose file location
DC := docker compose -f apps/infra/docker-compose.yml

# Load DB connection from infra .env (if it exists)
-include apps/infra/.env
export

DB_HOST ?= localhost
DB_PORT ?= $(POSTGRES_PORT)
DB_USER ?= $(POSTGRES_USER)
DB_NAME ?= $(POSTGRES_DB)

# ==============================================================================
# Targets
# ==============================================================================

.PHONY: start init seed dev stop

## start: Full bootstrap — init, seed, and launch dev servers
start: init seed dev

## init: Check prerequisites, install deps, start DB, run migrations
init:
	@echo "==> Checking prerequisites..."
	@node -v | grep -qE '^v(2[0-9]|[3-9][0-9])' || \
		(echo "❌ Node.js 20+ is required (found: $$(node -v))" && exit 1)
	@command -v pnpm >/dev/null 2>&1 || \
		(echo "❌ pnpm is required. Install: npm install -g pnpm" && exit 1)
	@command -v docker >/dev/null 2>&1 || \
		(echo "❌ Docker is required." && exit 1)
	@echo "✅ Prerequisites OK"
	@echo ""
	@echo "==> Copying .env files (if not present)..."
	@test -f apps/infra/.env || cp apps/infra/.env.example apps/infra/.env && echo "   Copied apps/infra/.env"
	@test -f apps/backend/.env || cp apps/backend/.env.example apps/backend/.env && echo "   Copied apps/backend/.env"
	@echo ""
	@echo "==> Installing dependencies..."
	@pnpm install
	@echo ""
	@echo "==> Starting PostgreSQL..."
	@$(DC) up -d
	@echo "==> Waiting for PostgreSQL to be ready..."
	@for i in $$(seq 1 30); do \
		$(DC) exec -T postgres pg_isready -U $(DB_USER) -q && break; \
		if [ $$i -eq 30 ]; then echo "❌ PostgreSQL did not become ready in time" && exit 1; fi; \
		sleep 1; \
	done
	@echo "✅ PostgreSQL is ready"
	@echo ""
	@echo "==> Running database migrations..."
	@pnpm --filter @hc/backend migration:run
	@echo "✅ Init complete"

## seed: Load sample data into the database
seed:
	@echo "==> Seeding database..."
	@$(DC) exec -T postgres psql -U $(DB_USER) -d $(DB_NAME) < apps/infra/seed.sql
	@echo "✅ Seed complete"

## dev: Start Docker, backend, and frontend for development
dev:
	@$(DC) up -d
	@echo "Starting backend and frontend..."
	@trap 'kill 0' EXIT; \
		pnpm --filter @hc/backend dev & \
		pnpm --filter @hc/frontend dev & \
		wait

## stop: Stop all services
stop:
	@echo "==> Stopping services..."
	@$(DC) down
	@echo "✅ All services stopped"
