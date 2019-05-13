import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialAnimationComponent } from './tutorial-animation.component';

describe('TutorialAnimationComponent', () => {
  let component: TutorialAnimationComponent;
  let fixture: ComponentFixture<TutorialAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
