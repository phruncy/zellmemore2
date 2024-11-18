import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-custom-footer',
    templateUrl: './custom-footer.component.html',
    styleUrls: ['./custom-footer.component.scss'],
    standalone: true,
    imports: [MatDivider, RouterLink]
})
export class CustomFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
