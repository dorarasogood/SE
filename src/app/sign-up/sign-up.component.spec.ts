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
    const spyObj  = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component cannot submit', () => {
    component.registerForm = {};
    component.registerForm.invalid = true;
    component.onSubmit();
    expect(component.registerForm.invalid).toBe(true);
  });

  it('component can submit in valid', () => {
    // component.ngOnInit();
    component.registerForm = {};
    component.registerForm.invalid = false;
    component.registerForm.value = {};
    component.registerForm.value.name = 'Jeff';
    component.registerForm.value.userName = 'Jeff';
    component.registerForm.value.password = 'abc123';
    component.loading = true;
    const spyObj = spyOn(authService, 'signUp');
    component.onSubmit();
    expect(component.registerForm.invalid).toBe(false);
    expect(component.loading).toBe(true);
    expect(spyObj).toHaveBeenCalledTimes(1);
  });

  it('component signup failed', () => {
    component.registerForm = {};
    component.registerForm.invalid = false;
    component.registerForm.value = {};
    component.registerForm.value.name = 'Jeff';
    component.registerForm.value.userName = 'Jeff';
    component.registerForm.value.password = 'abc123';
    const spyObj = spyOn(authService, 'signUp').and.callFake((name, username, password, successCallback, failureCallback)=>{
      failureCallback('test');
    });
    component.onSubmit();
    expect(spyObj).toHaveBeenCalledTimes(1);
    expect(component.registerForm.value.name).toBe('');
    expect(component.registerForm.value.userName).toBe('');
    expect(component.registerForm.value.password).toBe('');
  });

  it('component can use getter', () => {
    component.registerForm = {};
    component.registerForm.controls = 'test';
    const spyObj = spyOnProperty(component, 'f').and.callThrough();
    expect(component.f).toBe('test');
    expect(spyObj).toHaveBeenCalledTimes(1);
  });
});
