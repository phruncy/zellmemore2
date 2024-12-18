import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTileAreaComponent } from './add-tile-area.component';

describe('AddTileAreaComponent', () => {
    let component: AddTileAreaComponent;
    let fixture: ComponentFixture<AddTileAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddTileAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddTileAreaComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('areaWidth', 100);
        fixture.componentRef.setInput('areaHeight', 100);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
