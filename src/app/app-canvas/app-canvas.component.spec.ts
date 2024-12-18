import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetFrameComponent } from './app-canvas.component';

describe('WidgetFrameComponent', () => {
    let component: WidgetFrameComponent;
    let fixture: ComponentFixture<WidgetFrameComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [WidgetFrameComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
