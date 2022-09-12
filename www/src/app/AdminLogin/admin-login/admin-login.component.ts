import { Component, OnInit } from '@angular/core';
import { AdminAuthenticatorService } from 'src/app/Services/admin-authenticator.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private auth: AdminAuthenticatorService, private formbuilder: FormBuilder) { }

  ErrorMsg: string = '';
  IsLoggedIn:boolean = false;
  IsForcedLogOut:boolean = false;

  loginForm = this.formbuilder.group(
    {
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    }
  );

  ngOnInit(): void {

    this.ErrorMsg = "";

    this.auth.loginSubject$.subscribe((data)=>{
      next:
      this.IsLoggedIn = data;
    })

    this.auth.ForcedLogout$.subscribe((msg) =>{
      next:
      this.ErrorMsg = msg;
    })
  }


  AdminLogin() {
    this.ErrorMsg = '';
    this.auth.Login(this.loginForm.value).subscribe((loginResult: Boolean) => {

      if (loginResult) {
        console.log("logged in");
      }
      else {
        this.ErrorMsg = `Brugernavn eller password inkorrekt, du er låst ude af systemet. Vent venligst 5 minutter`;
      }


    });

  }

  AdminLogOut() {
    this.auth.Logout();
    this.ErrorMsg = '';
  }

  
}
