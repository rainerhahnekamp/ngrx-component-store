import { Component } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { HolidayCardComponent } from '@eternal/holidays/ui';
import { CommonModule } from '@angular/common';
import { HolidaysStore } from './holidays.store';

@Component({
  selector: 'eternal-holidays',
  template: `<h2>Choose among our Holidays</h2>
    <div class="flex flex-wrap justify-evenly">
      <eternal-holiday-card
        *ngFor="let holiday of holidays$ | async; trackBy: byId"
        [holiday]="holiday"
        (addFavourite)="addFavourite($event)"
        (removeFavourite)="removeFavourite($event)"
      >
      </eternal-holiday-card>
    </div>
    <pre>{{ holidays$ | async | json }}</pre> `,
  standalone: true,
  imports: [CommonModule, HolidayCardComponent],
})
export class HolidaysComponent {
  holidays$ = this.store.holidays$;
  constructor(private store: HolidaysStore) {}

  addFavourite(id: number) {
    this.store.addFavourite(id);
  }

  removeFavourite(id: number) {
    this.store.removeFavourite(id);
  }

  byId(index: number, holiday: Holiday) {
    return holiday.id;
  }
}
