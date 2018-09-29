import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProgramWindowComponent } from './program-window/program-window.component';
import { AppRoutingModule } from './app-routing.module';
import {AutomatonConfigurationService } from './automaton-configuration.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProgramWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AutomatonConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
