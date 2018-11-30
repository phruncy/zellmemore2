import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuleConverterService {

  constructor() { }

  decimalToBinary(): number [] {
      return [0,0,0,0,0,0,0,0];
  }

  binaryToDecimal(): number {
      return 110;
  }
}
