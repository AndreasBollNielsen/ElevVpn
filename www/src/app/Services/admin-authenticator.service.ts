import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Admin } from '../Interfaces/admin';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { addHours, addMinutes, format, isBefore } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatorService {

  adminuser: any[] = [];
  authenticated: boolean = false;
  public loginSubject$: Subject<boolean> = new Subject<boolean>();
  Passwordresponse$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private api: ApiServiceService) {

    this.authenticated = this.IsLoggedIn() ? true : false;
  }

  Login(userData: any): Observable<boolean> {

    console.log('calling api login: ', userData);


    this.api.CheckAdminLogin(userData).subscribe(data => {
      console.log("login: ", data);
      next: this.adminuser = data;
      let login: boolean = false;
      if (JSON.stringify(data) !== '{}') {
        console.log("authenticated");
        this.authenticated = true;

        this.setSession(data);
        login = this.authenticated;

      }
      this.loginSubject$.next(login);


    });
    return this.loginSubject$.asObservable();
  }


  UpdatePassword(userData: Admin) {
    console.log("sending from handler: ", userData);
    this.api.UpdateAdminLogin(userData).subscribe(response => {

      console.log("password response: ", response.success);
      this.Passwordresponse$.next(response.success);
    },
      error => {
        this.Passwordresponse$.next(error.error);
        console.log(error.error);
      }


    )
  }

  Logout(): Observable<boolean> {
    localStorage.removeItem('token_id');
    localStorage.removeItem('expiration');
    //this.removeCookie("admin");
    this.authenticated = false;
    this.loginSubject$.next(false);
    return this.loginSubject$.asObservable();
  }

  IsLoggedIn() {
    return this.GetExpiration();
   // this.loginSubject$.next(this.GetExpiration());
    //return this.loginSubject$.asObservable();
  }

  // isauthenticated() {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.authenticated);
  //     }, 800);
  //   });
  //   return promise;
  // }


  setSession(authData: any) {

    const now = new Date();
    format(now, 'dd.MM.yyyy');
    const expiration = addMinutes(now, 2);
    
    const timezone = expiration.getTimezoneOffset();
    const extendedExpiration = addHours(expiration,timezone);
    console.log("setting session json: ", JSON.stringify(expiration));
    console.log("setting session timezone: ", extendedExpiration);
    console.log("setting session real time: ", expiration.toString());
    localStorage.setItem('token_id', authData.token);
    localStorage.setItem('expiration', JSON.stringify(expiration));
  }


  GetExpiration() {
    const expire = localStorage.getItem('expiration');

     console.log("getting expiration date: ", expire);

    if (expire == null) {
      console.log("returning");
      return false;
    }
    const [date, time] = expire.split('T');
    console.log(time);
    const expiredate = new Date(`${date} ${time}`);
    const now = new Date();
    format(now, 'dd.MM.yyyy');

    console.log(`now ${now} expire ${expiredate}`);
    if (isBefore(now, expiredate)) {
      this.loginSubject$.next(true);
      return true;
    }
    else {
      this.Logout();
      return false;

    }

  }

}



