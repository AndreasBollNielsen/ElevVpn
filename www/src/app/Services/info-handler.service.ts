import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class InfoHandlerService {

  info$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  CrudResponse$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private crud: ApiServiceService) { }


  GetInfo() {
    this.crud.GetInfo().subscribe((data: any) => {
      next:
      this.info$.next(data.info);
      complete:
      console.log("Data from Handler: ", data.info);
    });
  }

  UpdateInfo(infoText: string) {
    let response = '';
    this.crud.UpdateInfo(infoText).subscribe((data: any) => {
      next:
      response = data;
      complete:
      this.CrudResponse$.next('følgemail opdateret!');
    }, 
    (error) => {
      this.CrudResponse$.next('følgemail ikke opdateret!');
    }
    )
  }
}
