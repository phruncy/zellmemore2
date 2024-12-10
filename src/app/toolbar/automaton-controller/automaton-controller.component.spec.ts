import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutomatonControllerComponent } from './automaton-controller.component';

describe('AutomatonControllerComponent', () => {
  let component: AutomatonControllerComponent;
  let fixture: ComponentFixture<AutomatonControllerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [AutomatonControllerComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatonControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
