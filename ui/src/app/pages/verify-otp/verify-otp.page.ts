import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss', '../login/login.page.scss'],
})
export class VerifyOtpPage {

  sentOtp: boolean = false;
  username: any;

  constructor(
    private userSrv: UserService
  ) { }

  ionViewWillEnter() {
    this.username = null;
    this.sentOtp = false;
  }

  isValidUsername() {
    var mobileRegx = new RegExp('^[0-9]{10}$');
    var mailRegx = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
    if(!!this.username && ((!isNaN(this.username) && mobileRegx.test(this.username)) || (isNaN(this.username) && mailRegx.test(this.username)))){
      return false;
    }else{
      return true;
    }
  }

  verifyUsername() {
    // UserService.verifyUsername()
    // .subscribe((res) => {
    //   console.log(res);
    // },(err) => {
    //   console.log(err);
    // })
  }

}
