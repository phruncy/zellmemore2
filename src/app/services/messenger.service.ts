import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from '../popup/popup.component';

@Injectable({
    providedIn: 'root',
})
export class MessengerService {
    constructor(private snackBar: MatSnackBar) {}

    openPopUp(message, _duration) {
        this.snackBar.openFromComponent(PopupComponent, {
            data: message,
            duration: _duration,
            verticalPosition: 'bottom',
        });
    }
}
