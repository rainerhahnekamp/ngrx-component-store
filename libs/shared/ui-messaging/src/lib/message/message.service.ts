import { Injectable } from '@angular/core';
import { MessageStore } from './message.store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation.component';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private messageStore: MessageStore, private dialog: MatDialog) {}
  info(message: string) {
    this.messageStore.add({ text: message, type: 'info' });
  }

  error(title: string) {
    this.messageStore.add({ text: title, type: 'error' });
  }

  confirm(message: string, deniable = false): Observable<boolean> {
    return this.dialog
      .open(ConfirmationComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message,
          deniable,
        },
      })
      .afterClosed()
      .pipe(map(Boolean));
  }
}
