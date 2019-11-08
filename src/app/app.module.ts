import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BodyObservationComponent } from './body-observation/body-observation.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { CarePlanComponent } from './care-plan/care-plan.component';
import { DialogOverviewExampleDialog } from './body-observation/body-observation-detail.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogOverviewExampleDialog,
    BodyObservationComponent,
    DiagnosisComponent,
    CarePlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    DialogOverviewExampleDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
