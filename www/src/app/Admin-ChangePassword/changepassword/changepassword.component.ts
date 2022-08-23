import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAuthenticatorService } from 'src/app/Services/admin-authenticator.service';
import { Admin } from 'src/app/Interfaces/admin';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  responseMessage: string = "";
 
  constructor(private formbuilder: FormBuilder, private auth: AdminAuthenticatorService) { }

  SubmitForm = this.formbuilder.group(
    {
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    }
  );


  ngOnInit(): void {
  }


  NewPassword()
  {

    let userData: Admin = this.SubmitForm.value;
    console.log(userData);
    
    this.auth.UpdatePassword(userData);
    this.auth.Passwordresponse$.subscribe((response:string) =>{
      next:
      this.responseMessage = response;
      console.log(this.responseMessage);
    })
  }
}
