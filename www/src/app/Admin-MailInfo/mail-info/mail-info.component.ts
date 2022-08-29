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
  link: string ="";
  feedbackText:string='';
  constructor(private infoHandler: InfoHandlerService) {

    this.infoHandler.info$.subscribe((data:any)=>{
      next:
      if(this.infotext != data.info)
      {
        this.infotext = data.info;
        this.link = data.link;
        console.log(this.infotext);
        this.feedbackText ='';
      }
    })

  }

  ngOnInit(): void {

    this.infoHandler.GetInfo()
  }

  UpdateInfo(data: string) {

  
    this.infoHandler.UpdateInfo(data,this.link);

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
