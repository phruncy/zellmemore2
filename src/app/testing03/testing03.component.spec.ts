import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testing03Component } from './testing03.component';

describe('Testing03Component', () => {
  let component: Testing03Component;
  let fixture: ComponentFixture<Testing03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testing03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testing03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
