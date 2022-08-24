import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { DataHandlerService } from 'src/app/Services/data-handler.service';
import { EmailHandlerService } from 'src/app/Services/email-handler.service';

@Component({
  selector: 'app-addmails',
  templateUrl: './addmails.component.html',
  styleUrls: ['./addmails.component.css']
})
export class AddmailsComponent implements OnInit {

  emails: string = '';
  Userlist: User[] = [];
  response: string ='';
  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
  }

  // GetWhitelistedUsers(): string {
  //   return this.Userlist.map(x => x.email).join('\n');
  // }

  AddEmails(data: string) {

    this.dataHandler.UploadUsers(data)
    this.dataHandler.feedback$.subscribe((response:string) =>{
      next:
      this.response = response;
    })
  }

}
