import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string, successCallback, failureCallback): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };

    var obj = {
      "userName": userName,
      "password": password
    }
    this.http.post<any>("http://127.0.0.1:3000/users", obj, options)
    .subscribe(successCallback, failureCallback);
  }

  signUp(name: string, userName: string, password: string, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };

    var obj = {
      "name": name,
      "userName": userName,
      "password": password
    }
    console.log("aaapost",obj);
    this.http.post<any>("http://127.0.0.1:3000/user/create", obj, options)
    .subscribe(successCallback, failureCallback);
  }

  getPatientId(userName:string, password: string, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };
    var obj = {
      "userName": userName,
      "password": password
    }
    // console.log("obj.userName:", obj.userName);
    // console.log("obj.password:", obj.password);

    this.http.post<any>("http://127.0.0.1:3000/users", obj, options)
    .subscribe(successCallback, failureCallback);
  }

  manageUserInfo(userName: string, password: string, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };
    var obj = {
      "userName": userName,
      "password": password
    };
    this.http.post<any>("http://127.0.0.1:3000/users/userInfo", obj, options)
    .subscribe(successCallback, failureCallback);
  }


  logout(): void {
    this.currentUser = null;
  }
}
