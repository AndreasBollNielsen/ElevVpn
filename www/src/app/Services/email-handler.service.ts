import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmailHandlerService {

  constructor(private crud: ApiServiceService) {

  }

  SendEmail(email: string) {
    console.log("sending mail from handler: ", email);

    // console.log(this.crud.GetUserData());
    this.crud.SendEmail(email);
  }
}
