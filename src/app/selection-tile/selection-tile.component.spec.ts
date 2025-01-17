import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionTileComponent } from './selection-tile.component';

describe('SelectionTileComponent', () => {
    let component: SelectionTileComponent;
    let fixture: ComponentFixture<SelectionTileComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectionTileComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectionTileComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'mock-id');
        fixture.componentRef.setInput('name', 'mock-name');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
