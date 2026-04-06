import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-offers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 class="text-2xl font-semibold p-6">Angebote</h2>`,
})
export class OffersComponent {}
