// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';
import { HttpClient } from '@angular/common/http';

import { AccountManageComponent } from './account-manage.component';

describe('AccountManageComponent', () => {
  let component: AccountManageComponent;
  let authService: AuthService;
  let router: Router;
  let http: HttpClient;
  let formBuilder: FormBuilder;
  let spyObj;
  // let fixture: ComponentFixture<AccountManageComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AccountManageComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    formBuilder = new FormBuilder();
    authService = new AuthService(http);
    spyObj = spyOn(authService, 'getUserName').and.callFake(() => {
      return 'Jeff';
    });
    // fixture = TestBed.createComponent(AccountManageComponent);
    component = new AccountManageComponent(authService, router, formBuilder);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component should do ngOninit', () => {
    component.ngOnInit();
  });

  it('component can submit in valid', () => {
    let userName = '';
    let oldpassword = '';
    let newpassword = '';
    component.accountManageForm = {};
    component.accountManageForm.invalid = false;
    component.accountManageForm.value = {};
    component.accountManageForm.value.oldPassword = 'abc123';
    component.accountManageForm.value.newPassword = 'abc456';
    component.accountManageForm.value.repeatNewPassword = 'abc456';
    spyObj = spyOn(authService, 'changePassword').and.callFake((username, oldPassword, newPassword, successCallback, failureCallback) => {
      userName = username;
      oldpassword = oldPassword;
      newpassword = newPassword;
    });
    component.onSubmit();
    expect(component.accountManageForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component can submit in valid', () => {
    component.accountManageForm = {};
    component.accountManageForm.invalid = false;
    component.accountManageForm.value = {};
    component.accountManageForm.value.oldPassword = 'abc123';
    component.accountManageForm.value.newPassword = 'abc456';
    component.accountManageForm.value.repeatNewPassword = 'abc456';
    spyObj = spyOn(authService, 'changePassword').and.callFake((username, oldPassword, newPassword, successCallback, failureCallback) => {
      failureCallback('test');
    });
    component.onSubmit();
    expect(component.accountManageForm.value.oldPassword).toBe('');
    expect(component.accountManageForm.value.newPassword).toBe('');
    expect(component.accountManageForm.value.repeatNewPassword).toBe('');
    expect(component.accountManageForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component cannot submit', () => {
    component.accountManageForm = {};
    component.accountManageForm.invalid = true;
    component.onSubmit();
    expect(component.accountManageForm.invalid).toBe(true);
  });

  it('component can use getter', () => {
    component.accountManageForm = {};
    component.accountManageForm.controls = 'test';
    spyObj = spyOnProperty(component, 'f').and.callThrough();
    expect(component.f).toBe('test');
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
});
