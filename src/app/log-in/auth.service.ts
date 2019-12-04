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

  manageAccount(userName: string, password: string, successCallback, failureCallback): void{
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

  manageUserInfo(patientId: number, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json;charset=utf-8',
    });
    let options = {
      headers
    };
    this.http.get<any>("http://hapi.fhir.org/baseR4/Patient/" + patientId + "?_pretty=true&_format=json", options)
    .subscribe(successCallback, failureCallback);
  }

  saveUserInfo(patientId: number, body, successCallback, failureCallback): void{
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/fhir+json;charset=utf-8',
    // });
    // let options = {
    //   headers
    // };
    let headers = new HttpHeaders({
      "Accept": "application/fhir+json;q=1.0, application/json+fhir;q=0.9",
      "Content-Type": "application/fhir+json; charset=UTF-8"
    });
    let options = {
      headers
    };

    this.http.put<any>("http://hapi.fhir.org/baseR4/Patient/" + patientId + "?_format=json&_pretty=true", body, options)
    .subscribe(successCallback, failureCallback);
  }


  logout(): void {
    this.currentUser = null;
  }

  changePassword(userName, oldPassword, newPassword, successCallback, failureCallback): void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers
    };
    var obj = {
      "userName": userName,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    };
    this.http.post<any>("http://127.0.0.1:3000/users/password", obj, options)
    .subscribe(successCallback, failureCallback);
  }
}
