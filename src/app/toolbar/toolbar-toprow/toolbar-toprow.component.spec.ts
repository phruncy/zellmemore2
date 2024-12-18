import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarToprowComponent } from './toolbar-toprow.component';

describe('TopbarComponent', () => {
    let component: ToolbarToprowComponent;
    let fixture: ComponentFixture<ToolbarToprowComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolbarToprowComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarToprowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
