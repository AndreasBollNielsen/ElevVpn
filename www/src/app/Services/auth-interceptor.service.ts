import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AdminAuthenticatorService } from './admin-authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AdminAuthenticatorService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    const clonedHTTPRequest = req.clone({ withCredentials: true });

    console.log("http interceptor");
      return next.handle(clonedHTTPRequest).pipe(catchError(error => {

        console.log(error);
        this.auth.ForceLogout();
        return of();
      }));

  }
}
