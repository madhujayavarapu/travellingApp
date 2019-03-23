import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService } from './services/notifications/notification.service';
import { Router } from '@angular/router';
// import { Network } from '@ionic-native/network';
// import { NetworkGuard } from './guards/network.guard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationSrv: NotificationService,
    private router: Router
    // private network: Network,
    // private events: Events,
    // private networkGuard: NetworkGuard
  ) {
    this.initializeApp();
    this.backBtnEvent();
  }

  backBtnEvent() {
    this.platform.backButton.subscribe(async () => {
      if (this.router.url === '/tabs/home' || this.router.url === '/login') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work for ionic 4
        } else {
            this.lastTimeBackPress = new Date().getTime();
        }
      }else{
        console.log("don't know what to do");
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.networkGuard.initializeNetworkEvents();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Offline event
      // this.events.subscribe('network:offline', () => {
      //   alert('network:offline ==> '+this.network.type);    
      // });

      // Online event
      // this.events.subscribe('network:online', () => {
      //   alert('network:online ==> '+this.network.type);        
      // });
    });

    // var lastTimeBackPress = 0;
    // var timePeriodToExit = 2000;

    // this.platform.registerBackButtonAction(() => {
    //   let view = this.nav.getActive();
    //   if (view.component.name == "HomePage") {
    //     if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
    //       this.platform.exitApp(); //Exit from app
    //     } else {
    //       this.notificationSrv.showToastMessage('Press back again to exit App', 'bottom');
    //       lastTimeBackPress = new Date().getTime();
    //     }
    //   } else {
    //     // go to previous page
    //     this.nav.pop({});
    //   }
    // });
  }
}
