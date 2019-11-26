import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BodyObservationComponent } from './body-observation/body-observation.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { CarePlanComponent } from './care-plan/care-plan.component';
import { BodyObservationDetailDialog } from './body-observation/body-observation-detail.component';


import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BodyObservationDetailDialog,
    BodyObservationComponent,
    DiagnosisComponent,
    CarePlanComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [
    BodyObservationDetailDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
