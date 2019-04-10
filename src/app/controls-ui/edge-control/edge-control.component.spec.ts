import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeControlComponent } from './edge-control.component';

describe('EdgeControlComponent', () => {
  let component: EdgeControlComponent;
  let fixture: ComponentFixture<EdgeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
