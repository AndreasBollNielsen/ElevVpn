import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { DataHandlerService } from 'src/app/Services/data-handler.service';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit {

  Userlist: User[] = [];

  constructor(private handlerService: DataHandlerService) {

    this.Userlist = [];
    this.handlerService.users$.subscribe((users: User[]) => {
      next:
      if (this.Userlist !== users) {
        this.Userlist = users;
      }
    })
  }

  ngOnInit(): void {


    
    this.handlerService.loadUsers();
  }



  ChangeSticky(userData: User) {

    this.handlerService.UpdateSticky(userData);
  }


  RemoveUser(user: User) {
   
    this.handlerService.DeleteUser(user);
  }

  RemoveAllUsers()
  {
    this.handlerService.DeleteAllUsers(this.Userlist);
  }

}
