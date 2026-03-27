import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menubar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-menubar [model]="menuItems">
      <ng-template #start>
        <span class="font-bold text-xl mr-4">HC SaaS</span>
      </ng-template>
    </p-menubar>
    <main class="p-4">
      <router-outlet />
    </main>
  `,
})
export class App {
  menuItems: MenuItem[] = [
    {
      label: 'Projects',
      icon: 'pi pi-folder',
      routerLink: '/projects',
    },
  ];
}
