import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChaosComponent } from './chaos.component';

describe('ChaosComponent', () => {
  let component: ChaosComponent;
  let fixture: ComponentFixture<ChaosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ChaosComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
