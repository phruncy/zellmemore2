import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  private message: String;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
      this.message = data;
   }

  ngOnInit() {
  }

}
