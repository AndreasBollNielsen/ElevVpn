import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from "rxjs/observable";
import { AdminAuthenticatorService } from './admin-authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authservice: AdminAuthenticatorService) { }

  canActivate( state: RouterStateSnapshot) {
    const loggedin = this.authservice.authenticated;
    console.log("auth guard: ", loggedin);
    if (loggedin) {
        // logged in so return true
       
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/user'], { queryParams: { returnUrl: state.url } });
    return false;
}


}
