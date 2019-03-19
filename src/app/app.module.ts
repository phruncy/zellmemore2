import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProgramWindowComponent } from './program-window/program-window.component';
import { AppRoutingModule } from './app-routing.module';
import { AutomatonConfigurationService } from './automaton-configuration.service';
import { WidgetComponent } from './widget/widget.component';
import { VisualizationDetailComponent } from './visualization-detail/visualization-detail.component';
import { VisualizationSelectionComponent } from './visualization-selection/visualization-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { TestingComponent } from './testing/testing.component';
import { Testing02Component } from './testing02/testing02.component';
import { Testing03Component } from './testing03/testing03.component';
import { AutomatonControllerComponent } from './automaton-controller/automaton-controller.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetFrameComponent } from './widget-frame/widget-frame.component';
import { MatSnackBarModule } from '@angular/material';
import { PopupComponent } from './popup/popup.component';
import { VizDefaultComponent } from './viz-default/viz-default.component';
import { VizPunchcardComponent } from './viz-punchcard/viz-punchcard.component';
import { VizThreadsComponent } from './viz-threads/viz-threads.component';
import { VizFrequencyComponent } from './viz-frequency/viz-frequency.component';
import { VizVortexComponent } from './viz-vortex/viz-vortex.component';
import { VizSignalsComponent } from './viz-signals/viz-signals.component';
import { VizWaves01Component } from './viz-waves01/viz-waves01.component';
import { VizWaves02Component } from './viz-waves02/viz-waves02.component';
import { VizWaves03Component } from './viz-waves03/viz-waves03.component';
import { VizWaves04Component } from './viz-waves04/viz-waves04.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProgramWindowComponent,
        WidgetComponent,
        VisualizationDetailComponent,
        VisualizationSelectionComponent,
        TestingComponent,
        Testing02Component,
        Testing03Component,
        AutomatonControllerComponent,
        FooterComponent,
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
        VizWaves04Component
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,
        MatSnackBarModule
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
        VizWaves04Component
    ]
})
export class AppModule { }
