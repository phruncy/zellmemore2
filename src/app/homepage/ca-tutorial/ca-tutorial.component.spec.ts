import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CaTutorialComponent } from './ca-tutorial.component';

describe('CaTutorialComponent', () => {
  let component: CaTutorialComponent;
  let fixture: ComponentFixture<CaTutorialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CaTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
