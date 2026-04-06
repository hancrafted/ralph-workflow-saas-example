import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 class="text-2xl font-semibold p-6">Einkaufsliste</h2>`,
})
export class ShoppingListComponent {}
