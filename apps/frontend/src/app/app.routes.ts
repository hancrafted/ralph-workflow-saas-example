import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
];
