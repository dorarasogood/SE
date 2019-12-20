import { NgForm , FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../log-in/auth.service';
import { HttpClient } from '@angular/common/http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let router: Router;
  let authService: AuthService;
  let formBuilder: FormBuilder;
  let http: HttpClient;


  beforeEach(() => {
    authService = new AuthService(http);
    formBuilder = new FormBuilder();
    component =  new SignUpComponent(authService, router, formBuilder);
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('component should do ngOninit', () => {
    let spyObj  = spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component can submit in valid', () => {
    // component.ngOnInit();
    component.registerForm = {};
    component.registerForm.invalid = false;
    component.registerForm.value = {};
    component.registerForm.value.name = "Jeff";
    component.registerForm.value.userName = "Jeff";
    component.registerForm.value.password = "abc123";
    component.loading = true;
    let spyObj = spyOn(authService, 'signUp');
    component.onSubmit();
    // expect(component.registerForm).toBe(1);
    // component.registerFor`m.invalid = false;
    expect(component.registerForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
    // component.registerForm.setValue('');
  });

  it('component signup failed', () => {
    component.registerForm = {};
    component.registerForm.invalid = false;
    component.registerForm.value = {};
    component.registerForm.value.name = "Jeff";
    component.registerForm.value.userName = "Jeff";
    component.registerForm.value.password = "abc123";
    component.loading = true;
    let spyObj = spyOn(authService, 'signUp').and.callFake((name, username, password, successCallback, failureCallback)=>{
      failureCallback("test");
    });
    component.onSubmit();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(component.registerForm.value.name).toBe("");
    expect(component.registerForm.value.userName).toBe("");
    expect(component.registerForm.value.password).toBe("");
  });

  // it('component should get data', () => {
  //   spyOnProperty(component, 'f', 'get')
  //   expect(component.f).toHaveBeenCalled();
  // });
});
