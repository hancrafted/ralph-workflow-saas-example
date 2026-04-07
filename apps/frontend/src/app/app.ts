import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from 'primeng/menu';
import { Drawer } from 'primeng/drawer';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu, Drawer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile top bar -->
    <header class="md:hidden flex items-center gap-3 px-4 py-3 border-b border-surface">
      <button
        class="p-2 rounded hover:bg-surface-100 cursor-pointer"
        aria-label="Toggle menu"
        (click)="drawerVisible.set(true)"
      >
        <i class="pi pi-bars text-xl"></i>
      </button>
      <span class="font-bold text-xl">Essensplaner</span>
    </header>

    <!-- Mobile drawer -->
    <p-drawer
      [(visible)]="drawerVisible"
      [modal]="true"
      position="left"
      styleClass="w-72"
    >
      <ng-template #header>
        <span class="font-bold text-xl">Essensplaner</span>
      </ng-template>
      <p-menu
        [model]="menuItems"
        styleClass="w-full border-0"
        (click)="drawerVisible.set(false)"
      />
    </p-drawer>

    <div class="flex h-screen">
      <!-- Desktop sidebar -->
      <aside class="hidden md:flex flex-col w-64 border-r border-surface shrink-0">
        <div class="px-5 py-4 border-b border-surface">
          <span class="font-bold text-xl">Essensplaner</span>
        </div>
        <p-menu [model]="menuItems" styleClass="w-full border-0" />
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {
  drawerVisible = signal(false);

  menuItems: MenuItem[] = [
    { label: 'Essensplan', icon: 'pi pi-calendar', routerLink: '/meal-plan' },
    { label: 'Rezepte', icon: 'pi pi-book', routerLink: '/recipes' },
    { label: 'Geschäfte', icon: 'pi pi-shop', routerLink: '/shops' },
    { label: 'Angebote', icon: 'pi pi-tag', routerLink: '/offers' },
    { label: 'Einkaufsliste', icon: 'pi pi-shopping-cart', routerLink: '/shopping-list' },
    { label: 'Zutaten', icon: 'pi pi-list', routerLink: '/ingredients' },
  ];
}
