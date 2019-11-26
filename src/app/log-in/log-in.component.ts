import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  cancel(): void {
    // this.router.navigate(['welcome']);
  }

  signUpClick(): void{
    this.router.navigate(['/sign-up']);
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      console.log("AAA000");
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password,(data)=>{
        console.log("callback", data);
        this.router.navigate(['/home']);
        
      }, ()=>{console.log("error")});

      // if (this.authService.redirectUrl) {
      //   this.router.navigateByUrl(this.authService.redirectUrl);
      // } else {
      //   
      // }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
