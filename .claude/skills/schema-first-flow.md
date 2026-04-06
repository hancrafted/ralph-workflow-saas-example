# Schema-First Development Flow

## The Rule

**Never hand-write GraphQL types.** All types are generated from the schema via codegen.

## Exact Order for Database-Touching Features

```
1. Write TypeORM migration
2. Run migration against local DB
3. NestJS resolver exposes new fields (code-first decorators)
4. Run graphql-codegen to generate TypeScript types
5. Use generated types in NestJS resolvers
6. Use generated types in Angular Apollo client
```

Every step depends on the previous one. Do not skip or reorder.

## Step 1: Write the Migration

- Use TypeORM migration CLI or write raw SQL
- Place in `apps/backend/src/migrations/`
- Name format: `<timestamp>-<description>.ts`
- Migration must be reversible (implement both `up` and `down`)

## Step 2: Run the Migration

```bash
pnpm --filter @hc/backend run migration:run
```

This applies the schema change to the local PostgreSQL database.

## Step 3: Update NestJS Resolvers

- Add or modify `@ObjectType()` classes to match new DB schema
- Add or modify `@Resolver()` methods for new queries/mutations
- Add `@InputType()` DTOs with class-validator decorators

## Step 4: Run GraphQL Codegen

```bash
pnpm --filter @hc/frontend run graphql:codegen
```

This reads the running GraphQL schema and generates TypeScript types.

## Step 5–6: Use Generated Types

- In NestJS: import generated types for resolver return types
- In Angular: import generated types for Apollo query/mutation variables and results
- Never create manual type definitions that duplicate generated ones

## Non-Database Features

If a feature doesn't touch the database, skip steps 1–2 and start at step 3 (resolver changes). Still run codegen after resolver changes.

## Common Mistakes to Avoid

- Writing GraphQL type interfaces by hand instead of using codegen
- Running codegen before the migration (schema won't have new columns)
- Forgetting to run codegen after adding new resolver fields
- Using `synchronize: true` instead of explicit migrations
