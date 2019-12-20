// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthService} from '../log-in/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: Router;
  let http: HttpClient;
  let authService: AuthService;
  let spyObj;
  beforeEach(() => {
    authService = new AuthService(http)
    spyObj = spyOn(authService, 'getUserInfo');
    component = new HomeComponent(router, authService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });
  it('should get user info', () => {
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
});
