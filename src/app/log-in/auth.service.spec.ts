import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { combineLatest } from 'rxjs';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('service should not login', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('service should login', () => {
    service.login('Jeff', '1234567', (data) => {
        console.log('data', data);
    }, () => {});
    const req = httpMock.expectOne('http://127.0.0.1:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'success' });
    expect(localStorage.getItem("User")).toEqual('{"msg":"success"}');
    localStorage.removeItem('User');
  });

});
