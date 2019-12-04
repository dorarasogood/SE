import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../log-in/auth.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {
  username: string;
  password: string;
  patientId: number;

  pageTitle = 'Manage User Info';

  constructor(private authService: AuthService, private router: Router) {
    this.username = "Jeff";
    this.password = "abc123";
    this.authService.getPatientId(this.username, this.password,(data)=>{
      this.patientId = data.patient_id;
    },()=>{
      console.log("error");
    })
    console.log("patientId: ", this.patientId);
  }

  ngOnInit() {
  }

  manageUserInfo(userInfoForm: NgForm): void{
    this.authService.manageUserInfo(this.username, userInfoForm.form.value.password,(data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    })
  }

}
