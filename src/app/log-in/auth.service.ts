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
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    // this.currentUser = {
    //   id: 2,
    //   userName,
    //   isAdmin: false
    // };
    let headers = new HttpHeaders({
      // 'Access-Control-Allow-Origin': "*",
      // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      // 'Access-Control-Max-Age': '86400',
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

  logout(): void {
    this.currentUser = null;
  }
}
