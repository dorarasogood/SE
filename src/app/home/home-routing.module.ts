import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BodyObservationComponent } from '../body-observation/body-observation.component';

const homeRoutingModule: Routes = [
    {
      path: '',
      component: HomeComponent,
      children: [
        {
          path: 'body-observation',
          component: BodyObservationComponent
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(homeRoutingModule)
    ],
    exports: [
      RouterModule
    ]
  })
export class HomeRoutingModule {}