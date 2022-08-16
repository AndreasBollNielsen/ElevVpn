import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { EmailHandlerService } from 'src/app/Services/email-handler.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  constructor(private api: ApiServiceService, private formbuilder: FormBuilder, private mailHandler:EmailHandlerService) {}

  ngOnInit(): void {}

  requestForm = this.formbuilder.group(
    {
      email: ['', Validators.required]
    }
  );

  SendMail() {
    let data = this.requestForm.value;
    this.mailHandler.SendEmail(data);
    console.log("sending mail from component: ",data);
    //this.api.SendEmail();
  }
}
