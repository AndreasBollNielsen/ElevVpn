import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit {

  Userlist: User[] = [];

  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
    this.api.GetUserData().subscribe((data: any[]) => {
      next: this.api.PopulateList(data);
      complete: this.getusers();
    });



  }


  getusers() {
    this.Userlist = this.api.GetUserList();

  }

  ChangeSticky(userData: User) {

    // console.log(userData);
    this.api.UpdateSticky(userData);
  }

  
}
