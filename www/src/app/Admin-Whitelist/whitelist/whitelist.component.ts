import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { DataHandlerService } from 'src/app/Services/data-handler.service';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit {

  Userlist: User[] = [];

  constructor(private api: ApiServiceService, private handlerService: DataHandlerService) {

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

    // console.log(userData);
    this.api.UpdateSticky(userData);
  }


  RemoveUser(user: User) {
   
    
    this.handlerService.DeleteUser(user);
    // this.api.DeleteUser(id);
  }

  RemoveAllUsers()
  {
    this.handlerService.DeleteAllUsers(this.Userlist);
  }

}
