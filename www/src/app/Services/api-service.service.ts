import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../Interfaces/user';
import { Admin } from '../Interfaces/admin';
import { UserViewComponent } from '../UserInput/user-view/user-view.component';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  adminuser: any = { userName: 'admin', password: 'admin' };

  constructor(private http: HttpClient) { }

  GetUserData(): Observable<User[]> {
    return this.http.get<User[]>('http://172.18.150.51:3600/api/Getusers');
  }

  AddUserEmail(data: string[]) {
    console.log("data: ", data);
    return this.http.post<any>('http://172.18.150.51:3600/api/AddUsers', data).subscribe();
  }

  SendEmail(data: any) {

    console.log("sending mail from crud: ", data);
    return this.http.post<any>('http://localhost:3600/api/email/SendMail', data).subscribe();
  }

  CheckAdminLogin(data: any) {

    const d = JSON.stringify(data);
    const d2 = JSON.stringify({ userName: 'admin', passWord: 'admin' });
    const username = data.userName;
    const password = data.passWord;
    console.log("test");
    
    // console.log('user data: +' + `${username}` + `${password}`);
    // console.log("before api: ", d2);
    console.log('query: ' + 'http://172.18.150.51:3600/api/admin/?' + `userName=${username}&passWord=${password}`);
    return this.http.get<any>('http://172.18.150.51:3600/api/admin/?' + `userName=${username}&passWord=${password}`);
    
  }

  DeleteUser(user: any) {

    const data = { id: user.id, email: user.email };
    return this.http.delete<any>('http://172.18.150.51:3600/api/RemoveUser', { 'body': data });
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
