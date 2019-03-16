import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage {

  @Input() busNumber: string;
  @Input() route: string;
  @Input() boardingPoint: string;
  @Input() droppingPoint: string;
  @Input() totalPrice: number;
  @Input() numOfSeats: number;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    console.log(this.busNumber, this.route, this.droppingPoint, this.boardingPoint, this.totalPrice, this.numOfSeats);
  }

  closeModal(reason) {
    this.modalCtrl.dismiss({
      'isConfirmed': reason == 'confirm' ? true : false
    })
  }
}
