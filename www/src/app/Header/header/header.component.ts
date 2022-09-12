import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { AdminAuthenticatorService } from 'src/app/Services/admin-authenticator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 public LoggedIn: boolean = false;

  constructor(private auth: AdminAuthenticatorService,private router: Router) {

    router.navigate(['/user']);
    
    this.auth.loginSubject$.subscribe((loginSubject:boolean)=>{

      this.LoggedIn = loginSubject;
    });

   }

  ngOnInit(): void {


    //this.LoggedIn = localStorage.getItem("admin") != null ? true:false;
    //this.LoggedIn = this.auth.IsLoggedIn() ? true:false;
    
    
    
    
    
    
    //this.LoggedIn = this.auth.authenticated;
  }

}
