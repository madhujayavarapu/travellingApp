import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  loading;
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
  }

  async initLoader(loaderId, text) {
    this.loading = await this.loadingCtrl.create({
      message: text,
      spinner: 'bubbles'
    })
    this.loading.present();
  }

  async stopLoader(loaderId) {
    console.log(this.loading);
    // this.loading.dismiss();
  }

  async showAlert(header, subheader, message, buttons){
    if(buttons.length == 0){
      buttons = ['Ok'];
    }
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: buttons
    });

    await alert.present();
  }

  async showToastMessage(message, position){
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: position,
      duration: 2000,
      closeButtonText: 'X'
    });
    await toast.present();
  }
}
