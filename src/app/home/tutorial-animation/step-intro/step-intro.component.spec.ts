import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StepIntroComponent } from './step-intro.component';

describe('StepIntroComponent', () => {
    let component: StepIntroComponent;
    let fixture: ComponentFixture<StepIntroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StepIntroComponent],
            providers: [provideAnimations()],
        }).compileComponents();

        fixture = TestBed.createComponent(StepIntroComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('activeDescription', 0);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
