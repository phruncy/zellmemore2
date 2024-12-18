import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Step06Component } from './step06.component';

describe('Step06Component', () => {
    let component: Step06Component;
    let fixture: ComponentFixture<Step06Component>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [Step06Component],
            providers: [provideAnimations()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Step06Component);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('activeDescription', 0);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
