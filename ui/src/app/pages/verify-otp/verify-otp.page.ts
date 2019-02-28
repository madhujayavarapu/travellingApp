import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss', '../login/login.page.scss'],
})
export class VerifyOtpPage {

  sentOtp: boolean = false;
  username: string;

  constructor(
    private userSrv: UserService
  ) { }

  ionViewWillEnter() {
    this.username = null;
    this.sentOtp = false;
  }

  verifyUsername() {
    UserService.verifyUsername()
    .subscribe((res) => {
      console.log(res);
    },(err) => {
      console.log(err);
    })
  }

}
