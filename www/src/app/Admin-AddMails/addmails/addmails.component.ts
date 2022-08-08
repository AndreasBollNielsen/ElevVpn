import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-addmails',
  templateUrl: './addmails.component.html',
  styleUrls: ['./addmails.component.css']
})
export class AddmailsComponent implements OnInit {

  emails: string = '';
  Userlist: User[] = [];
  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
  }

  GetWhitelistedUsers(): string {
    return this.Userlist.map(x => x.email).join('\n');
  }

  AddEmails(data: string) {
    const arr = data.split(/\r?\n/);
   // console.log('1', arr);
  //  const resp = ;
  this.api.AddUserEmail(arr);
    
  // console.log('finised sending: ' + JSON.stringify(arr));
  }

}
