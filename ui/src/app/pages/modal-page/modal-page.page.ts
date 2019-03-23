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
  @Input() fairDetails: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
  }

  closeModal(reason) {
    this.modalCtrl.dismiss({
      'isConfirmed': reason == 'confirm' ? true : false
    })
  }
}
