import { Query, Resolver } from '@nestjs/graphql';

/**
 * Minimal code-first resolver that proves the NestJS GraphQL layer works
 * alongside the PostGraphile endpoint.
 *
 * Full CRUD operations are handled automatically by PostGraphile at /postgraphile
 * (allProjects, projectById, createProject, updateProject, deleteProject).
 *
 * This resolver can be extended with custom business-logic queries/mutations
 * that are outside PostGraphile's auto-generated scope.
 */
@Resolver()
export class ProjectResolver {
  @Query(() => String)
  hello(): string {
    return 'NestJS GraphQL layer is operational';
  }
}
