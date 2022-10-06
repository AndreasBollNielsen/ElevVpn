import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AdminAuthenticatorService } from './admin-authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AdminAuthenticatorService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.auth.authenticated) {
      // return next.handle(req);
    }

    const clonedHTTPRequest = req.clone({ withCredentials: true });
    console.log("intercepter ", clonedHTTPRequest);
    return next.handle(clonedHTTPRequest).pipe(catchError(error => {

     // console.log("interceptor error: ", error.error);
      
     // no connection to server
      if(error.status === 0)
      {
        error.error = "ingen forbindelse til serveren";
      }

      //force logout if status 401
      if (error.status === 401) {
        this.auth.ForceLogout();

      }

      //return error
      return throwError(error);
    }));

  }
}
