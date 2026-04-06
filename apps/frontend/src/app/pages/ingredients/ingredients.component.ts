import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 class="text-2xl font-semibold p-6">Zutaten</h2>`,
})
export class IngredientsComponent {}
