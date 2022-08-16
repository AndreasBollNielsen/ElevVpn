import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmailHandlerService {

  constructor(private crud: ApiServiceService) {

  }

  SendEmail(email: string) {
    console.log("sending mail from handler: ",email);
    this.crud.SendEmail(email);
  }
}
