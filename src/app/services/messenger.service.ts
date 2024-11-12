import { Injectable, ViewContainerRef } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { PopupComponent } from '../popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  openPopUp(message, _duration, container: ViewContainerRef) {
    this.snackBar.openFromComponent(
        PopupComponent, {data: message, duration: _duration, verticalPosition: 'bottom'}
        );
}
}
