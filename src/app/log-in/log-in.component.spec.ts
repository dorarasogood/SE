// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';


describe('LogInComponent', () => {
  let authService: AuthService;
  let router: Router;
  let http: HttpClient;
  let component: LogInComponent;
  let validators: any[];
  let asyncValidators: any[];
  let loginForm = new NgForm(validators, asyncValidators);

  beforeEach(() => {
    authService = new AuthService(http);
    component = new LogInComponent(authService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should cancel', ()=> {
    let spyObj = spyOn(loginForm, 'reset');
    component.cancel(loginForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  })
  it('shoulde login', () => {
    let spyObj = spyOn(authService, 'login');
    component.login(loginForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
});
