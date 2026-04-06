# GraphQL Architecture

## Stack

- **Apollo Server 5** on NestJS 11
- **Code-first** approach — TypeScript decorators define the GraphQL schema
- Single endpoint: `/graphql`

## Code-First Pattern

Schema is defined via TypeScript classes with NestJS/GraphQL decorators:

```typescript
@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;
}

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> { ... }

  @Mutation(() => Project)
  async createProject(@Args('input') input: CreateProjectInput): Promise<Project> { ... }
}
```

## Architecture Rules

- **One `/graphql` endpoint** — all queries and mutations go through it
- NestJS Apollo module auto-generates the SDL schema from decorated classes
- No separate `.graphql` schema files on the backend — the code IS the schema
- Frontend uses codegen to generate types FROM the running schema

## Resolver Organization

- Each feature module has its own resolver(s)
- Resolvers are co-located with their module (same directory)
- Resolvers inject services for business logic — no direct DB access in resolvers

## Type Flow

```
NestJS @ObjectType() decorators
  → Apollo Server generates SDL at runtime
    → graphql-codegen reads SDL and generates TypeScript types
      → Angular components import generated types for Apollo Client
```

## Client Side

- Angular uses **Apollo Client** with generated typed operations
- Queries and mutations are co-located with the component that uses them
- Use `QueryRef` / typed `mutate()` calls for full type safety
