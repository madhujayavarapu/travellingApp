import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusService } from 'src/app/services/bus.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.page.html',
  styleUrls: ['./seats.page.scss'],
})
export class SeatsPage {

  busNumber: string;
  selectedRoute: string;
  boardingPoint: string;
  droppingPoint: string;
  fairDetails: any;
  backBtnLink: string;
  numOfSeats: number = 0;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busSrv: BusService,
    private notificationSrv: NotificationService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.busNumber = route.snapshot.params['busNumber'];
    this.selectedRoute = route.snapshot.params['route'];
    this.boardingPoint = route.snapshot.params['boardingPoint'];
    this.droppingPoint = route.snapshot.params['droppingPoint'];

    this.backBtnLink = 'tabs,home,seat-selection,'+this.selectedRoute+","+this.busNumber;
    console.log(this.backBtnLink);
  }

  ionViewWillEnter() {
    this.getFairDetailsForTrip();
  }

  async getFairDetailsForTrip() {
    let postData = {
      busNumber: this.busNumber,
      route: this.selectedRoute,
      boardingPoint: this.boardingPoint,
      droppingPoint: this.droppingPoint
    }
    let loader = await this.loadingCtrl.create({
      message: 'Getting Fair Details..Please wait',
      spinner: 'bubbles'
    });
    await loader.present();
    this.busSrv.getFareDetailsForTrip(postData)
    .subscribe((res) => {
      loader.dismiss();
      if(!!res.status){
        this.fairDetails = this.formatFairDetails(res.data);
      }else{
        this.notificationSrv.showToastMessage(res.msg,'top');
      }
    },(err) => {
      loader.dismiss();
      this.notificationSrv.showToastMessage(err.msg, 'top');
    })
  }

  async checkout() {
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      componentProps: {
        busNumber: this.busNumber,
        route: this.selectedRoute,
        boardingPoint: this.boardingPoint,
        droppingPoint: this.droppingPoint,
        numOfSeats: this.numOfSeats,
        totalPrice: this.totalPrice
      },
      showBackdrop: true,
      mode: 'md',
      backdropDismiss: false
    })

    modal.onWillDismiss().then((data: any) => {
      console.log('modal closed in seats page: ',data.data.isConfirmed);
      if(data.data.isConfirmed)
        this.router.navigate(['','payment', this.selectedRoute, this.busNumber, this.boardingPoint, this.droppingPoint, this.totalPrice, this.numOfSeats]);
      else 
        this.notificationSrv.showToastMessage('fuck...****','top');
    })
    return await modal.present();
  }

  changeSeatCount(action, ticket){
    if(action == 'checkbox'){
      if(!ticket.isChecked){
        this.totalPrice -= (ticket.count * ticket.price);
        this.numOfSeats -= ticket.count;
        ticket.count = 0;
      }else{
        this.numOfSeats += 1;
        ticket.count = 1;
        this.totalPrice += ticket.price;
      }
    }else if(action == 'increment'){
      this.numOfSeats += 1;
      ticket.count += 1;
      this.totalPrice += ticket.price;
      ticket.isChecked = true;
    }else {
      this.numOfSeats = this.numOfSeats > 0 ? this.numOfSeats - 1 : 0;
      ticket.count = ticket.count > 0 ? ticket.count - 1 : 0;
      this.totalPrice = this.totalPrice > 0 ? this.totalPrice - ticket.price : 0;
      ticket.isChecked = ticket.count > 0 ? true : false;
    }
  }

  formatFairDetails(details) {
    let arr = [];
    let mapTicekts = {
      'halfTicketPrice':  'Half Ticket',
      'fullTicketPrice': 'Full Ticket',
      'seniorCitizenPrice': 'Senior Citizen'
    }
    for(let key in details){
      let obj = {
        type: mapTicekts[key],
        price: details[key],
        count: 0,
        isChecked: false,
        key
      }
      arr.push(obj);
    }
    return arr;
  }
}
