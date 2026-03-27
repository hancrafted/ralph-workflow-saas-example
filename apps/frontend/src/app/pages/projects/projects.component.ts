import { Component, ChangeDetectionStrategy, OnInit, inject, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TableModule } from 'primeng/table';
import { DateTime } from 'luxon';

const ALL_PROJECTS_QUERY = gql`
  query AllProjects {
    allProjects {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Projects</h2>
      <p-table [value]="projects()" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #header>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </ng-template>
        <ng-template #body let-project>
          <tr>
            <td>{{ project.name }}</td>
            <td>{{ project.description ?? '—' }}</td>
            <td>{{ formatDate(project.createdAt) }}</td>
          </tr>
        </ng-template>
        <ng-template #emptymessage>
          <tr>
            <td colspan="3" class="text-center text-gray-500 py-8">
              No projects yet. Create your first project to get started.
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class ProjectsComponent implements OnInit {
  private readonly apollo = inject(Apollo);
  projects = signal<Project[]>([]);

  ngOnInit(): void {
    this.apollo
      .watchQuery<{ allProjects: Project[] }>({
        query: ALL_PROJECTS_QUERY,
      })
      .valueChanges.subscribe(({ data }) => {
        this.projects.set((data?.allProjects as Project[]) ?? []);
      });
  }

  formatDate(iso: string): string {
    return DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED);
  }
}
