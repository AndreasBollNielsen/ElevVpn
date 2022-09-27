import { Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AdminAuthenticatorService } from './Services/admin-authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Elev_VPN';

  constructor(private router: Router, private auth: AdminAuthenticatorService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {

        console.log("route changed: ", event.url);
        // if (!auth.checkedLogin) {

        //   auth.checkedLogin = true;
        // }
        console.log('checking login');
        auth.IsLoggedIn();

        if (event.url != "/user") {
         
        }
      }
    })
  }
}
