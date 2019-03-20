import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testing02Component } from './testing02.component';

describe('Testing02Component', () => {
  let component: Testing02Component;
  let fixture: ComponentFixture<Testing02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testing02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testing02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
