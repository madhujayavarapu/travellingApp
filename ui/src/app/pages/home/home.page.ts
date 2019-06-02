import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  wt: string = "-1";
  routes: any = [];
  busNumber: string;
  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private router: Router,
    private busSrv: BusService,
    private notificationSrv: NotificationService
  ) { }

  ionViewWillEnter() {
    this.getRoues();
    this.resetFileds();
  }

  getRoues() {
    this.busSrv.getFromAndToList()
    .subscribe((res) => {
      if(res.status){
        this.routes = res.data;
      }else{
        this.notificationSrv.showToastMessage(res.msg, 'top');
      }
    },(err) => {
      this.notificationSrv.showToastMessage(err.msg, 'top');
    })
  }

  routeChaged() {
    this.busNumber = "";
  }

  resetFileds() {
    this.wt = "-1";
    this.busNumber = "";
  }

  getSeatSelection() {
    if(this.wt != "-1" && !!this.busNumber && this.busNumber != ""){
      let postData = {route: this.wt, busNumber: this.busNumber};
      this.busSrv.getBusDetails(postData)
      .subscribe((res) => {
        if(!!res.status){
          this.router.navigate(['', 'seat-selection', this.wt, this.busNumber]); 
        }else{
          this.notificationSrv.showToastMessage(res.msg, 'top');
        }
      },(err) => {
        console.log(err);
        this.notificationSrv.showToastMessage(err.msg, 'top');
      })
    }else {
      this.notificationSrv.showToastMessage('Please select route and bus number', 'top');
    }
  }

}
