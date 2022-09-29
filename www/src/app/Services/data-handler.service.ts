import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Interfaces/user';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  feedback$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private crud: ApiServiceService) {


  }


  UploadUsers(data:string){

    //const emails = data.split(/\r?\n?\s/);
    const emails = data.replace(/[\n,;:]/g,","). split(/[, ]+/);

    console.log(emails);


    this.crud.AddUserEmail(emails).subscribe(response =>{
      next:
      console.log(response.success);
      this.feedback$.next(response.success);
    },
    error =>{
      console.log(error.error);
      this.feedback$.next(error.error);
    })

  }

  loadUsers() {
    let tempUsers;
    this.crud.GetUserData().subscribe((data: User[]) => {
      next:
      tempUsers = data;
      complete:
      this.users$.next(this.PopulateList(tempUsers));
     // console.log(this.users$);
    });
  }

  DeleteUser(user: User) {
    if (!user.sticky) {
      this.crud.DeleteUser(user).subscribe(() => {
        complete:
        console.log("reloading");
        this.loadUsers();
      });

    }
  }

  UpdateSticky(user:User)
  {
    this.crud.UpdateSticky(user);
  }

  DeleteAllUsers(users: User[])
  {
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      if(!user.sticky)
      {
        this.DeleteUser(user);
      }
    }
  }


  PopulateList(userData: any[]) {

    let tempList = [];
    for (let index = 0; index < userData.length; index++) {
      const element = userData[index];
      // console.log(element.hasVpn);
      tempList.push({ id: element.id, email: element.email, vpn: element.hasVpn, sticky: element.isSticky });
      //  console.log(this.tempList[this.tempList.length -1]);
    }
    return tempList;
  }

}
