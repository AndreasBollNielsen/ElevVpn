import { Component, OnInit } from '@angular/core';
import { InfoHandlerService } from 'src/app/Services/info-handler.service';

@Component({
  selector: 'app-mail-info',
  templateUrl: './mail-info.component.html',
  styleUrls: ['./mail-info.component.css']
})
export class MailInfoComponent implements OnInit {

  infotext: string = "";
  modifiedInfoText: string = "";
  feedbackText:string='';
  constructor(private infoHandler: InfoHandlerService) {

    this.infoHandler.info$.subscribe((data:string)=>{
      next:
      if(this.infotext != data)
      {
        this.infotext = data;
        console.log(this.infotext);
        this.feedbackText ='';
      }
    })

  }

  ngOnInit(): void {

    this.infoHandler.GetInfo()
  }

  UpdateInfo(data: string) {

    this.infoHandler.UpdateInfo(data);

    this.infoHandler.CrudResponse$.subscribe((response:string)=>{
      next:
      this.feedbackText = response;
    })
  }

  //reset feedback text if textarea is in focus
  ResetFeedback()
  {
    if(this.feedbackText != '')
    {
      this.feedbackText = '';
    }
  }

}
