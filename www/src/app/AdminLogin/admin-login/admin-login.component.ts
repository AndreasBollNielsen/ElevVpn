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

  loginForm = this.formbuilder.group(
    {
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    }
  );

  ngOnInit(): void {
  }


  AdminLogin() {
    this.ErrorMsg = '';
    this.auth.Login(this.loginForm.value).subscribe((loginResult:Boolean) => {

      if(loginResult)
      {
        console.log("logged in");
      }
      else
      {
        this.ErrorMsg = 'Brugernavn eller password inkorrekt. Henvend dig til CFMN';
      }


    });

  }

  AdminLogOut()
  {
    this.auth.Logout();
    this.ErrorMsg = '';
  }

  GetSessionData(): boolean
  {
    return this.auth.getCookie("admin") == null ? true:false;
    //return localStorage.getItem("admin") == null ? true:false;
  }
}
