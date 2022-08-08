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

    this.authenticated = this.getCookie("admin") != null ? true:false;
    //this.authenticated = localStorage.getItem("admin") != null ? true : false;
  }

  Login(userData: any): Observable<boolean> {

    console.log('calling api login: ', userData);

    // let subject = new Subject<boolean>();

    this.api.CheckAdminLogin(userData).subscribe(data => {
      console.log("login: ", data.length);
      next: this.adminuser = data;
      let login: boolean = false;
      if (this.adminuser.length > 0) {
        console.log("authenticated");
        this.authenticated = true;
      //  localStorage.setItem('admin', 'loggedIn');
        this.setCookie("admin","loggedIn",0.01);
        login = this.authenticated;

      }
      this.loginSubject.next(login);


    });
    return this.loginSubject.asObservable();
  }

  Logout(): Observable<boolean> {
   // localStorage.removeItem('admin');
    this.removeCookie("admin");
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

  

  setCookie(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
      console.log("expire: ",date);
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  removeCookie(name:string)
  {
    document.cookie = name + "=;" +"expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("removing cookies");
  }



}



