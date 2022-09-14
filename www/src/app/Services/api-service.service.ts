import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Admin } from '../Interfaces/admin';
import {ip,localhost} from '../../assets/Config.json';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  hosts = {
    "ip": "172.18.150.51",
    "local": "https://localhost"
  };

   host = this.hosts.local;
 // host2 = localhost;
  constructor(private http: HttpClient) {
  }

  GetUserData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}:3600/api/Getusers`);
  }

  AddUserEmail(data: string[]) {

    return this.http.post<any>(`http://${this.host}:3600/api/AddUsers`, data);
  }

  SendEmail(data: any) {

    console.log("sending mail from crud: ", data);
    return this.http.post<any>(`http://${this.host}:3600/api/email/SendMail`, data);
  }

  CheckAdminLogin(data: any) {

    const username = data.userName;
    const password = data.passWord;

    return this.http.get<any>(`${this.host}:3600/api/admin/?` + `userName=${username}&passWord=${password}`, { withCredentials: true });

  }

  VerifyExpiration() {
    return this.http.get<any>(`http://${this.host}:3600/api//admin/VerifyExpiration`);
  }

  UpdateAdminLogin(data: Admin) {

    const userData = { "userName": data.userName, "passWord": data.passWord };
    return this.http.patch<any>(`http://${this.host}:3600/api/admin/update`, userData);

  }

  ClearCookie() {
    return this.http.post<any>(`http://${this.host}:3600/api/admin/LogOut`, {});
  }

  DeleteUser(user: any) {

    const data = { id: user.id, email: user.email };
    return this.http.delete<any>(`http://${this.host}:3600/api/RemoveUser`, { 'body': data });
  }


  UpdateSticky(user: User) {
    const data = { id: user.id, sticky: user.sticky };
    this.http.post<any>(`http://${this.host}:3600/api/UpdateSticky`, data).subscribe();
  }


  GetInfo() {
    return this.http.get<any>(`http://${this.host}:3600/api/info/GetInfo`);
  }


  UpdateInfo(infoText: string, link: string) {
    const data = { "textInfo": infoText, "link": link };
    return this.http.post<any>(`http://${this.host}:3600/api/info/UpdateInfo`, data);
  }

}
