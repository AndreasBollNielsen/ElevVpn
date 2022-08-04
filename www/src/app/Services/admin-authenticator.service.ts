import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Admin } from '../Interfaces/admin';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatorService {

  adminuser: any[] = [];
  authenticated: boolean = false;
  public loginSubject: Subject<boolean> = new Subject<boolean>();
  //public activeLogin = this.loginSubject.asObservable();
  constructor(private api: ApiServiceService) {

    this.authenticated = localStorage.getItem("admin") != null ? true:false;
  }

  Login(userData: any): Observable<boolean> {

    console.log('calling api login: ', userData);

   // let subject = new Subject<boolean>();

    this.api.CheckAdminLogin(userData).subscribe(data => {
      console.log("login: ", data.length);
      next: this.adminuser = data;
      let login:boolean = false;
      if (this.adminuser.length > 0) {
        console.log("authenticated");
        this.authenticated = true;
        localStorage.setItem('admin', 'loggedIn');
        login = this.authenticated;
        
      }
      this.loginSubject.next(login);


    });
    return this.loginSubject.asObservable();
  }

  Logout():Observable<boolean> {
    localStorage.removeItem('admin');
    this.authenticated = false;
    this.loginSubject.next(false);
    return this.loginSubject.asObservable();
  }

  isauthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.authenticated);
      }, 800);
    });
    return promise;
  }

}



