import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Admin } from '../Interfaces/admin';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { addHours, addMinutes, format, isBefore } from 'date-fns';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatorService {

  adminuser: any[] = [];
  authenticated: boolean = false;
  hasBeenLoggedIn: boolean = false;
  checkedLogin: boolean = false;
  public loginSubject$: Subject<boolean> = new Subject<boolean>();
  public ForcedLogout$: Subject<string> = new Subject<string>();
  Passwordresponse$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private api: ApiServiceService, private route: Router) {

    // this.authenticated = this.IsLoggedIn() ? true : false;
  }

  Login(userData: any): Observable<boolean> {

    console.log('calling api login: ', userData);


    this.api.CheckAdminLogin(userData).subscribe(data => {
      console.log("login: ", data);
      // next: this.adminuser = data;
      let login: boolean = false;
      if (JSON.stringify(data) !== '{}') {
        console.log("authenticated");
        this.authenticated = true;
        // this.setSession(data);
        login = this.authenticated;
        this.hasBeenLoggedIn = false;

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

    this.api.ClearCookie().subscribe((data) => {
      next:
      console.log("logging out: ", data);
    })
    this.authenticated = false;
    this.hasBeenLoggedIn = true;
    this.loginSubject$.next(false);
    return this.loginSubject$.asObservable();
  }

  ForceLogout() {
    console.log("forced logout: ", this.authenticated);
    if (this.authenticated) {

      this.authenticated = false;
      this.loginSubject$.next(false);
      this.ForcedLogout$.next("Session udløbet...");
      this.route.navigate(["admin-login"]);
    }
    return this.loginSubject$.asObservable();
  }

  IsLoggedIn() {

    if (!this.hasBeenLoggedIn) {
      console.log('checking expiration');
      return this.GetExpiration();
    }
    console.log('not loggedin');
    return false;

  }


  GetExpiration() {
    let verification = false;
    this.api.VerifyExpiration().subscribe((data: any) => {

      complete:
      if (data.verified) {
        console.log("expiraton: ", data.verified);
        verification = data.verified;
        this.authenticated = true;
        this.loginSubject$.next(true);

      }
      else {
        this.Logout();
        verification = false;

      }
    })

    return true;

  }

}



