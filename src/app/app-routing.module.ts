import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LogInComponent } from './log-in/log-in.component'
import { BodyObservationComponent } from './body-observation/body-observation.component'
import { DiagnosisComponent } from "./diagnosis/diagnosis.component";
import { CarePlanComponent } from "./care-plan/care-plan.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'body-observation',
        component: BodyObservationComponent
      },
      {
        path: 'diagnosis',
        component: DiagnosisComponent
      },
      {
        path: 'care-plan',
        component: CarePlanComponent
      }
    ],
    data: { preload: true }
  },
  {
    path:'log-in',
    component: LogInComponent
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
