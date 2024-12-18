import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DisclaimerComponent } from './disclaimer.component';

describe('DisclaimerComponent', () => {
    let component: DisclaimerComponent;
    let fixture: ComponentFixture<DisclaimerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DisclaimerComponent],
            providers: [provideRouter([])],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisclaimerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
