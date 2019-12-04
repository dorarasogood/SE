import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTitle;
  isLoggedIn = true;
  constructor(private router: Router) {
    this.pageTitle = "Health Tracking System";
  }

  // logIn(): void {
  //   this.router.navigate['/chart'];
  // }

  logOut(): void {
    this.isLoggedIn = false;
    this.router.navigate['/home'];
  }

  ngOnInit() {
  }

}
