import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutomatonControllerComponent } from './automaton-controller.component';
import { AutomatonService } from 'src/app/services/automaton.service';

describe('AutomatonControllerComponent', () => {
  let component: AutomatonControllerComponent;
  let fixture: ComponentFixture<AutomatonControllerComponent>;
  let automatonService: AutomatonService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [AutomatonControllerComponent],
    providers: [AutomatonService]
  })
    .compileComponents();

    const automatonService = TestBed.inject(AutomatonService);
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
