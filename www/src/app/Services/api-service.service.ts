import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Admin } from '../Interfaces/admin';
import config from '../../assets/Config.json';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
 
  host = config.ip;
  

  constructor(private http: HttpClient) {
  }

  GetUserData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}Getusers`);
  }

  AddUserEmail(data: string[]) {

    return this.http.post<any>(`${this.host}AddUsers`, data);
  }

  SendEmail(data: any) {

    console.log("sending mail from crud: ", data);
    return this.http.post<any>(`${this.host}email/SendMail`, data);
  }

  CheckAdminLogin(data: any) {

    const username = data.userName;
    const password = data.passWord;
    
    return this.http.get<any>(`${this.host}admin/?` + `userName=${username}&passWord=${password}`, { withCredentials: true });
   // return this.http.get<any>(`${this.host}loginTest`,{withCredentials:true});
   
  }

  VerifyExpiration() {
    return this.http.get<any>(`${this.host}admin/VerifyExpiration`,{withCredentials:true});
  }

  UpdateAdminLogin(data: Admin) {

    const userData = { "userName": data.userName, "passWord": data.passWord };
    return this.http.patch<any>(`${this.host}admin/update`, userData);

  }

  ClearCookie() {
    return this.http.post<any>(`${this.host}admin/LogOut`, {});
  }

  DeleteUser(user: any) {

    const data = { id: user.id, email: user.email };
    return this.http.delete<any>(`${this.host}RemoveUser`, { 'body': data });
  }


  UpdateSticky(user: User) {
    const data = { id: user.id, sticky: user.sticky };
    this.http.post<any>(`${this.host}UpdateSticky`, data).subscribe();
  }


  GetInfo() {
    return this.http.get<any>(`${this.host}info/GetInfo`);
  }


  UpdateInfo(infoText: string, link: string) {
    const data = { "textInfo": infoText, "link": link };
    return this.http.post<any>(`${this.host}info/UpdateInfo`, data);
  }

}
