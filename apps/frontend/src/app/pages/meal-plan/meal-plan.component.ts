import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-meal-plan',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 class="text-2xl font-semibold p-6">Essensplan</h2>`,
})
export class MealPlanComponent {}
