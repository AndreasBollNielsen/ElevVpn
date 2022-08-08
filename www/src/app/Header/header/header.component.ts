import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { AdminAuthenticatorService } from 'src/app/Services/admin-authenticator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 public LoggedIn: boolean = false;

  constructor(private auth: AdminAuthenticatorService) {

    this.auth.loginSubject.subscribe((loginSubject:boolean)=>{

      this.LoggedIn = loginSubject;
    });

   }

  ngOnInit(): void {


    //this.LoggedIn = localStorage.getItem("admin") != null ? true:false;
    this.LoggedIn = this.auth.getCookie("admin") != null ? true:false;
    
    
    
    
    
    
    //this.LoggedIn = this.auth.authenticated;
  }

}
