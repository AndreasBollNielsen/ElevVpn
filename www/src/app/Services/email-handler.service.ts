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

    // console.log(this.crud.GetUserData());
    this.crud.SendEmail(email).subscribe(response => {

      console.log("email response: ", response.info);
      this.response$.next(response.info);
    },
      error => {
        this.response$.next(error.error);
      }


    )
  }
}
