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
  tempList: User[] = [];
  constructor(private http: HttpClient) { }

  GetUserData() {
    return this.http.get<User[]>('http://localhost:3600/api/Getusers');
  }

  AddUserEmail(data: string[]) {
    return this.http.post<any>('http://localhost:3600/api/AddUsers', data);
  }

  CheckAdminLogin(data: any) {

    const d = JSON.stringify(data);
    const d2 = JSON.stringify({ userName: 'admin', passWord: 'admin' });
    const username = data.userName;
    const password = data.passWord;
    // console.log('user data: +' + `${username}` + `${password}`);
    // console.log("before api: ", d2);
    console.log('query: ' + 'http://localhost:3600/api/admin/:?' + `userName=${username}&passWord=${password}`);
    return this.http.get<any>('http://localhost:3600/api/admin/:?' + `userName=${username}&passWord=${password}`);
  }

  DeleteUser(index: any) {

    return this.http.delete<any>('http://localhost:3600/del', index);
  }

  PopulateList(userData: any[]) {

    this.tempList = [];
    for (let index = 0; index < userData.length; index++) {
      const element = userData[index];
      // console.log(element.hasVpn);
      this.tempList.push({ id: element.id, email: element.email, vpn: element.hasVpn, sticky: element.isSticky });
      //  console.log(this.tempList[this.tempList.length -1]);
    }

  }

  GetUserList() {
    const vpn = this.tempList[0].vpn;
    return this.tempList.slice();
  }

  UpdateSticky(user: User) {
    const data = [{ id: user.id, sticky: user.sticky }];
    console.log(data);
    this.http.post<any>('http://localhost:3600/api/UpdateSticky/?id=1&sticky=true',['test','test2']).subscribe(newdata =>{
      console.log(newdata);
    })
  }

}
