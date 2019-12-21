import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../log-in/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInfoComponent } from './user-info.component';
import { NgForm } from '@angular/forms';

describe('UserInfoComponent', () => {
  let http: HttpClient;
  let authService: AuthService;
  let component: UserInfoComponent;
  let data;
  let userInfoForm: NgForm;
  let validators: any[];
  let asyncValidators: any[];
  beforeEach(() => {
    data = {
      name: [{
        given: [
          'Jeff'
        ]
      }],
      telecom: [{
        value: '091234567'
      }],
      gender: 'male',
      birthDate: '1996-11-13'
    }
    authService = new AuthService(http);
    const spyObj = spyOn(authService, 'getUserInfo').and.callFake((successCallback, failureCallback) => {
      successCallback(data);
      failureCallback();
    });
    component =  new UserInfoComponent(authService);
    component.ngOnInit();
  });

  it('component should create', () => {
    expect(component).toBeTruthy();
  });

  it('component shoud update', () => {
    component.update();
    expect(component.editMode).toBe(true);
    expect(component.originUserInfo.name).toEqual(data.name[0].given[0]);
    expect(component.originUserInfo.email).toEqual(data.telecom[0].value);
    expect(component.originUserInfo.gender).toEqual(data.gender);
    expect(component.originUserInfo.birthDate).toEqual(data.birthDate);
  });

  it('component shoud cancel', () => {
    component.cancel();
    expect(component.editMode).toBe(false);
    expect(component.userInfo.name).toEqual(component.originUserInfo.name);
    expect(component.userInfo.email).toEqual(component.originUserInfo.email);
    expect(component.userInfo.gender).toEqual(component.originUserInfo.gender);
    expect(component.userInfo.birthDate).toEqual(component.originUserInfo.birthDate);
  });

  it('component shoud save', () => {
    const spyObj = spyOn(authService, 'getPatientId').and.callFake(() => {
      return '56899';
    });
    const spyObj_2 = spyOn(authService, 'saveUserInfo').and.callFake((body, successCallback, failureCallback) => {
      successCallback();
      failureCallback();
    });
    component.save();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(spyObj_2).toHaveBeenCalledTimes(1);
  });

  it('component shoud manageAccount', () => {
    userInfoForm = new NgForm(validators, asyncValidators);
    const spyObj = spyOn(authService, 'manageAccount').and.callFake((username, password, successCallback, failureCallback) => {
      successCallback();
      failureCallback('error');
    });
    component.manageAccount(userInfoForm);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

});
