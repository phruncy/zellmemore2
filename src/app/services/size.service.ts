import { Injectable } from '@angular/core';

@Injectable()
export class SizeService {
    private _config = {
        canvasWidth: 0,
        canvasHeight: 0,
        widgetNumber: 0,
        widgetSize: 0,
        minWidgetSize: 250,
        addAreaSmallSide: 35,
        margin: 8,
    };

    get isSmallMobile(): boolean {
        return (
            this._config.canvasWidth - this._config.margin - this._config.addAreaSmallSide <
            this._config.minWidgetSize * 2
        );
    }

    get addAreaWidth(): number {
        return this.isSmallMobile ? this._config.widgetSize : this._config.addAreaSmallSide;
    }

    get addAreaHeight(): number {
        return this.isSmallMobile ? this._config.addAreaSmallSide : this._config.widgetSize;
    }

    get widgetSize(): number {
        return this._config.widgetSize;
    }

    get margin(): number {
        return this._config.margin;
    }

    public setFrameSize(width: number, height: number) {
        this._config.canvasWidth = width;
        this._config.canvasHeight = height;
        this.setWidgetSize();
    }

    recalculateWidgetSize(numWidgets: number) {
        this._config.widgetNumber = numWidgets;
        this.setWidgetSize();
    }

    private setWidgetSize() {
        if (this._config.canvasHeight > this._config.canvasWidth && this.isSmallMobile) {
            this._config.widgetSize = this._config.canvasWidth - this._config.margin;
        } else {
            this._config.widgetSize = this.calculateForLargeLayout();
        }
    }

    private calculateForLargeLayout(): number {
        let rows = 1;
        let sidelength = 0;
        while ((sidelength = this.calculateWidgetSize(rows)) < this.calculateWidgetSize(rows + 1)) {
            rows++;
        }
        return sidelength;
    }

    /**
     * Calculate Max length of each square if they are arranged in a layout with n rows:
     * Calculate a the maximum size based on both the width and the height and take the
     * minium of both in order to fit both constraints
     */
    private calculateWidgetSize(rows: number): number {
        const maxWidgetsPerRow = Math.ceil(this._config.widgetNumber / rows);
        const netWidth =
            this._config.canvasWidth - maxWidgetsPerRow * this._config.margin - this.addAreaWidth;
        const netHeight = this._config.canvasHeight - rows * this._config.margin;
        const maxWidth = netWidth / maxWidgetsPerRow;
        const maxHeight = netHeight / rows;
        return Math.min(maxWidth, maxHeight);
    }
}
