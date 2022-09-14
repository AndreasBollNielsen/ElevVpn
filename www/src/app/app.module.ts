import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserViewComponent } from './UserInput/user-view/user-view.component';
import { AdminLoginComponent } from './AdminLogin/admin-login/admin-login.component';
import { HeaderComponent } from './Header/header/header.component';
import { AddmailsComponent } from './Admin-AddMails/addmails/addmails.component';
import { WhitelistComponent } from './Admin-Whitelist/whitelist/whitelist.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './Services/auth-guard.service';
import { MailInfoComponent } from './Admin-MailInfo/mail-info/mail-info.component';
import { ChangepasswordComponent } from './Admin-ChangePassword/changepassword/changepassword.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';

const routes: Routes = [
  { path: 'user', component: UserViewComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-addmail', component: AddmailsComponent, canActivate: [AuthGuardService] },
  { path: 'admin-whitelist', component: WhitelistComponent, canActivate: [AuthGuardService] },
  { path: 'admin-mailInfo', component: MailInfoComponent, canActivate: [AuthGuardService] },
  { path: 'admin-passwordChange', component: ChangepasswordComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  declarations: [
    AppComponent,
    UserViewComponent,
    AdminLoginComponent,
    HeaderComponent,
    AddmailsComponent,
    WhitelistComponent,
    MailInfoComponent,
    ChangepasswordComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuardService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
