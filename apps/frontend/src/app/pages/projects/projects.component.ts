import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Projects</h2>
      <p class="text-gray-500">No projects yet. This page will display your projects.</p>
    </div>
  `,
})
export class ProjectsComponent {}
