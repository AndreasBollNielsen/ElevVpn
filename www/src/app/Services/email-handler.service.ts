import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmailHandlerService {

  response$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private crud: ApiServiceService) {

  }

  SendEmail(email: string) {
    console.log("sending mail from handler: ", email);

    this.crud.SendEmail(email).subscribe(response => {

      console.log("email response: ", response);
      this.response$.next(response.info);
    },
      error => {
      // console.log("callback error message: ",error.error);
        this.response$.next(error.error);
      }
    )
  }
}
