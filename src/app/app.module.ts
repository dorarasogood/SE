import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { BodyObservationComponent } from './body-observation/body-observation.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { CarePlanComponent } from './care-plan/care-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BodyObservationComponent,
    DiagnosisComponent,
    CarePlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
