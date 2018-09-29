import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramWindowComponent } from './program-window.component';

describe('ProgramWindowComponent', () => {
  let component: ProgramWindowComponent;
  let fixture: ComponentFixture<ProgramWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
