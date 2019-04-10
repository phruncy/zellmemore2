import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProgramWindowComponent } from './program-window/program-window.component';
import { AppRoutingModule } from './app-routing.module';
import { AutomatonConfigurationService } from './services/automaton-configuration.service';
import { WidgetComponent } from './widget/widget.component';
import { VisualizationDetailComponent } from './visualization-detail/visualization-detail.component';
import { VisualizationSelectionComponent } from './visualization-selection/visualization-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { Testing02Component } from './widget-content/barcodes/testing02.component';
import { AutomatonControllerComponent } from './controls-ui/automaton-controller/automaton-controller.component';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetFrameComponent } from './widget-frame/widget-frame.component';
import { MatSnackBarModule, MatTooltipModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { PopupComponent } from './popup/popup.component';
import { VizDefaultComponent } from './widget-content/default/viz-default.component';
import { VizPunchcardComponent } from './widget-content/punchcard/viz-punchcard.component';
import { VizThreadsComponent } from './widget-content/threads/viz-threads.component';
import { VizFrequencyComponent } from './widget-content/frequency/viz-frequency.component';
import { VizVortexComponent } from './widget-content/vortex/viz-vortex.component';
import { VizSignalsComponent } from './widget-content/signals/viz-signals.component';
import { VizWaves01Component } from './widget-content/waves01/viz-waves01.component';
import { VizWaves02Component } from './widget-content/waves02/viz-waves02.component';
import { VizWaves03Component } from './widget-content/waves03/viz-waves03.component';
import { VizWaves04Component } from './widget-content/waves04/viz-waves04.component';
import { StatusDisplayComponent } from './status-display/status-display.component';
import 'hammerjs';
import { ChaosComponent } from './widget-content/chaos/chaos.component';
import { RuleControlComponent } from './rule-control/rule-control.component';
import { SpeedControlComponent } from './controls-ui/speed-control/speed-control.component';
import { EdgeControlComponent } from './controls-ui/edge-control/edge-control.component';
import { CellsControlComponent } from './controls-ui/cells-control/cells-control.component';
import { StateControlComponent } from './controls-ui/state-control/state-control.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProgramWindowComponent,
        WidgetComponent,
        VisualizationDetailComponent,
        VisualizationSelectionComponent,
        Testing02Component,
        AutomatonControllerComponent,
        WidgetFrameComponent,
        PopupComponent,
        VizDefaultComponent,
        VizPunchcardComponent,
        VizThreadsComponent,
        VizFrequencyComponent,
        VizVortexComponent,
        VizSignalsComponent,
        VizWaves01Component,
        VizWaves02Component,
        VizWaves03Component,
        VizWaves04Component,
        StatusDisplayComponent,
        CustomFooterComponent,
        ChaosComponent,
        RuleControlComponent,
        SpeedControlComponent,
        EdgeControlComponent,
        CellsControlComponent,
        StateControlComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule
    ],
    providers: [AutomatonConfigurationService],
    bootstrap: [AppComponent],
    entryComponents: [
        WidgetComponent,
        VizDefaultComponent,
        Testing02Component,
        VizFrequencyComponent,
        PopupComponent,
        VizPunchcardComponent,
        VizThreadsComponent,
        VizVortexComponent,
        VizSignalsComponent,
        VizWaves01Component,
        VizWaves02Component,
        VizWaves03Component,
        VizWaves04Component,
        ChaosComponent
    ]
})
export class AppModule { }
