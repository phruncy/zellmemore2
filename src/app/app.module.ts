import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
        Testing03Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [AutomatonConfigurationService],
    bootstrap: [AppComponent],
    entryComponents: [
        WidgetComponent,
        TestingComponent,
        Testing02Component,
        Testing03Component
    ]
})
export class AppModule { }
