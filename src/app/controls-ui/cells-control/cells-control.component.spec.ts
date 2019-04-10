import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellsControlComponent } from './cells-control.component';

describe('CellsControlComponent', () => {
  let component: CellsControlComponent;
  let fixture: ComponentFixture<CellsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
