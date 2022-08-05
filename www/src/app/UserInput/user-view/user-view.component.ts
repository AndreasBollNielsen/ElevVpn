import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent implements OnInit {
  constructor(private api: ApiServiceService, private formbuilder: FormBuilder) {}

  ngOnInit(): void {}

  requestForm = this.formbuilder.group(
    {
      email: ['', Validators.required]
    }
  );

  SendMail() {
    this.api.SendEmail(this.requestForm.value);
  }
}
