import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Step02Component } from './step02.component';

describe('Step02Component', () => {
  let component: Step02Component;
  let fixture: ComponentFixture<Step02Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Step02Component],
    providers: [provideAnimations()] 
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step02Component);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeDescription', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
