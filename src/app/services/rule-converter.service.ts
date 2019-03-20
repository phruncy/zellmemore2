import { Injectable } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class RuleConverterService {

  constructor() { }

  /* 
   * Attention: the actual ruleset is in reverse order
   * (meaning 1 is at index 0 and 128 is at index 7) 
   */ 
  decimalToBinary(number: number): number [] {
        if (!((number >= 0) && (number <= 255))) {
            throw new Error('invalid rule input');
        }
        const binary = number.toString(2);
        const binaryRuleset = [];
        for (let i = 0; i < binary.length; i++) {
            binaryRuleset.unshift(parseInt(binary.charAt(i), 10));
        }
        while (binaryRuleset.length < 8) {
            binaryRuleset.push(0);
        }
        return  binaryRuleset;
  }

  binaryToDecimal(rule: number[]): number {
      let binary = '';
      rule.forEach(element => binary = element + binary);
      return parseInt(binary, 2);
  }
}
