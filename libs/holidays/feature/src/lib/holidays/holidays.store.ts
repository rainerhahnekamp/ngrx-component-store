import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { createHoliday, Holiday } from '@eternal/holidays/model';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '@eternal/shared/config';
import { Injectable, OnDestroy } from '@angular/core';

export interface HolidaysState {
  holidays: Holiday[];
  favouriteIds: number[];
}

@Injectable({ providedIn: 'root' })
export class HolidaysStore
  extends ComponentStore<HolidaysState>
  implements OnDestroy
{
  removeFavourite = this.updater(
    (state, holidayId: number): HolidaysState => ({
      ...state,
      favouriteIds: state.favouriteIds.filter((id) => id !== holidayId),
    })
  );

  constructor(private httpClient: HttpClient, private config: Configuration) {
    super({ holidays: [createHoliday()], favouriteIds: [] });
    this.#load();
  }

  #load = this.effect((origin$: Observable<void>) =>
    origin$.pipe(
      switchMap(() =>
        this.httpClient.get<Holiday[]>(`${this.config.baseUrl}/holiday`)
      ),
      tapResponse(
        (holidays) => this.patchState(() => ({ holidays })),
        console.error
      )
    )
  );

  holidays$ = this.select(({ holidays, favouriteIds }) =>
    holidays.map((holiday) => ({
      ...holiday,
      isFavourite: favouriteIds.includes(holiday.id),
    }))
  );

  addFavourite(holidayId: number) {
    this.patchState((state) => ({
      favouriteIds: [...state.favouriteIds, holidayId],
    }));
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    console.log('werde zerstört');
  }
}
