import { Injectable, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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
