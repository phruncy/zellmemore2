import { Component } from '@angular/core';
import { ContentBase } from '../content-base/contentBase.component';
import { AutomatonService } from '../automaton.service';
import { SizeService } from '../size.service';

@Component({
  selector: 'app-testing03',
  templateUrl: './testing03.component.html',
  styleUrls: ['./testing03.component.css']
})
export class Testing03Component extends ContentBase {


  constructor(automaton: AutomatonService,
              sizeService: SizeService) {
      super(automaton, sizeService);
   }

  update() {
      console.log('testing 03 updated');
      console.log('höhe ' + this.widgetWidth);
  }

  onResize() {
      console.log('testing03 resized');
  }

  onReset() {
      
  }


}
