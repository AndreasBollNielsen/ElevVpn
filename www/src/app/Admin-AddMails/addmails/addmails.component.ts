import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { EmailHandlerService } from 'src/app/Services/email-handler.service';

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
    const emails = data.split(/\r?\n/);

    console.log("sending mail from add emails component: ", emails);
    //  const resp = ;
    this.api.AddUserEmail(emails);

    // console.log('finised sending: ' + JSON.stringify(arr));
  }

}
