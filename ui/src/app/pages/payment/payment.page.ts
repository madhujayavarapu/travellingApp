import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {

  constructor(
    private router: Router
  ) { }

  paymentDone(){
    this.router.navigate(['', 'tabs', 'tickets']);
  }

}
