import { Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => String)
  hello(): string {
    return 'NestJS GraphQL layer is operational';
  }

  @Query(() => [Project], { name: 'allProjects' })
  async allProjects(): Promise<Project[]> {
    return this.projectService.findAll();
  }
}
