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
import { AutomatonControllerComponent } from './automaton-controller/automaton-controller.component';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetFrameComponent } from './widget-frame/widget-frame.component';
import { MatSnackBarModule, MatTooltipModule } from '@angular/material';
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
        ChaosComponent
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
        MatTooltipModule
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
