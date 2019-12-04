import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LogInComponent } from './log-in/log-in.component'
import { BodyObservationComponent } from './body-observation/body-observation.component'
import { DiagnosisComponent } from "./diagnosis/diagnosis.component";
import { CarePlanComponent } from "./care-plan/care-plan.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { SeLineChartComponent } from "./se-line-chart/se-line-chart.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { AccountManageComponent } from "./account-manage/account-manage.component";
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
      },
      {
        path: 'chart',
        component: SeLineChartComponent
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
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  },
  {
    path: 'account-manage',
    component: AccountManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
