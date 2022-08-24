import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Admin } from '../Interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(private http: HttpClient) { }

  GetUserData(): Observable<User[]> {
   // return this.http.get<User[]>('http://172.18.150.51:3600/api/Getusers');
    return this.http.get<User[]>('http://localhost:3600/api/Getusers');
  }

  AddUserEmail(data: string[]) {
    
   // return this.http.post<any>('http://172.18.150.51:3600/api/AddUsers', data);
    return this.http.post<any>('http://localhost:3600/api/AddUsers', data);
  }

  SendEmail(data: any) {

    console.log("sending mail from crud: ", data);
    return this.http.post<any>('http://172.18.150.51:3600/api/email/SendMail', data);
   // return this.http.post<any>('http://localhost:3600/api/email/SendMail', data);
  }

  CheckAdminLogin(data: any) {

    const username = data.userName;
    const password = data.passWord;

    //return this.http.get<any>('http://172.18.150.51:3600/api/admin/?' + `userName=${username}&passWord=${password}`);
    return this.http.get<any>('http://localhost:3600/api/admin/?' + `userName=${username}&passWord=${password}`);

  }

  UpdateAdminLogin(data: Admin) {

    const userData = { "userName": data.userName, "passWord": data.passWord };


    return this.http.patch<any>('http://172.18.150.51:3600/api/admin/update', userData);
    //return this.http.patch<any>('http://localhost:3600/api/admin/update',userData);

  }

  DeleteUser(user: any) {

    const data = { id: user.id, email: user.email };
    //return this.http.delete<any>('http://172.18.150.51:3600/api/RemoveUser', { 'body': data });
    return this.http.delete<any>('http://localhost:3600/api/RemoveUser', { 'body': data });
  }


  UpdateSticky(user: User) {
    const data = { id: user.id, sticky: user.sticky };
    this.http.post<any>('http://172.18.150.51:3600/api/UpdateSticky', data).subscribe();
  }


  GetInfo() {
    return this.http.get<any>('http://172.18.150.51:3600/api/info/GetInfo');
  }


  UpdateInfo(infoText: string) {
    const data = { "textInfo": infoText };
    return this.http.post<any>('http://172.18.150.51:3600/api/info/UpdateInfo', data);
  }

}
