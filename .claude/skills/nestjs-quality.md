# NestJS Quality Standards

## Module Organization

- **One module per feature boundary** (e.g., `UsersModule`, `ProjectsModule`)
- Each module encapsulates its own resolver, service, DTOs, and entities
- Import shared modules explicitly — no global modules unless necessary
- Register modules in `AppModule`

## Dependency Injection

- Use **decorators** for dependency injection (`@Injectable()`, `@Inject()`)
- Services are `@Injectable()` with `providedIn` scope managed by the module
- Inject dependencies via constructor parameters

## DTOs & Validation

- Define DTOs for all input types (create, update, filter)
- Validate DTOs with **class-validator** decorators:
  ```typescript
  @InputType()
  export class CreateProjectInput {
    @Field()
    @IsString()
    @MinLength(1)
    name: string;
  }
  ```
- Use `class-transformer` for transformation when needed
- Never trust raw input — always validate

## GraphQL Resolvers

- **Co-locate resolvers with their module** — resolver lives in the same directory as the module
- Use NestJS `@Resolver()`, `@Query()`, `@Mutation()`, `@Args()` decorators
- Code-first approach: TypeScript classes define the schema via decorators
- Return types must use `@ObjectType()` decorated classes

## Entity Design

- TypeORM entities define the database schema
- Entities are used for migrations only (`synchronize: false`)
- Never use `synchronize: true` — all schema changes go through migrations

## Error Handling

- Throw NestJS `HttpException` subclasses or GraphQL-appropriate errors
- Return meaningful error messages
- Never expose internal stack traces in production

## Version

- **NestJS 11**, **Apollo Server 5** (code-first)
- **TypeORM 0.3** (migrations only)
