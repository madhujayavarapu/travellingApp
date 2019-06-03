import { UtilsService } from './../../utils/utils.service';
import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notifications/notification.service';
import { OTP_EXPIRE_TIME } from '../../constants/proj.constant';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss', '../login/login.page.scss'],
})
export class VerifyOtpPage {

  username: any;
  otpSent: boolean = false;
  otp: number;
  submitText: string = "Send OTP";
  note: string = "You will get an OTP to your username.";
  usernameType: string;
  timer: string = "";

  constructor(
    private userSrv: UserService,
    private router: Router,
    private notificationSrv: NotificationService,
    private utilsSrv: UtilsService
  ) { }

  ionViewWillEnter() {
    this.resetAllFields();
  }

  resetAllFields() {
    this.username = null;
    this.otpSent = false;
    this.submitText = "Send OTP";
    this.otp = null;
    this.note = "You will get an OTP to your username.";
  }

  validForm() {
    return this.otpSent ? !this.isValidOTP() : !this.isValidUsername();
  }

  submitForm() {
    if(this.otpSent){
      this.validateOtp();
    }else{
      this.verifyUsername();
    }
  }

  isValidOTP() {
    let otpRegx = new RegExp('^[0-9]{6}$');
    return !(!!this.otp && otpRegx.test(this.otp.toString()));
  }

  isValidUsername() {
    var mobileRegx = new RegExp('^[0-9]{10}$');
    var mailRegx = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+)\.+([a-zA-Z0-9]{2,4})$');
    if(!!this.username && (!isNaN(this.username) && mobileRegx.test(this.username))){
      this.usernameType = "mobile";
      return false;
    }else if(!!this.username && (isNaN(this.username) && mailRegx.test(this.username))) {
      this.usernameType = "mail";
      return false;
    }else{
      return true;
    }
  }
  
  verifyUsername() {
    let postData = {
      username: this.username,
      usernameType: this.usernameType
    }
    this.userSrv.verifyUsername(postData)
    .subscribe((res) => {
      if(res.status){
        this.notificationSrv.showToastMessage(res.msg, 'top');
        this.otpSent = true;
        this.submitText = "Validate OTP";
        this.note = "Sent OTP to your username.";
        this.startTimer();
      }else{
        this.notificationSrv.showToastMessage(res.msg, 'top');
      }
    },(err) => {
      this.notificationSrv.showToastMessage(err.msg, 'top');
    })
  }

  startTimer() {
    let timeInSeconds = OTP_EXPIRE_TIME * 60;
    console.log(timeInSeconds);
    var interval = setInterval(() => {
      timeInSeconds -= 1;
      this.timer = this.utilsSrv.convertSecondsToMinutes(timeInSeconds); 
      // Expired OTP TIME;
      if(timeInSeconds <= 0){
        clearInterval(interval);
        this.timer = 'Expired';
        this.otpSent = false;
        this.submitText = 'Resend OTP';
        this.note = "OTP is Expired.Click on resend to get otp";
      }
    }, 1000)
  }

  validateOtp() {
    let postData = {
      username: this.username,
      otp: this.otp
    }
    this.userSrv.validateOtp(postData)
    .subscribe((res) => {
      if(res.status){
        this.notificationSrv.showToastMessage(res.msg, 'top');
        this.router.navigate(['', 'register', this.username]);        
      }else{
        this.notificationSrv.showToastMessage(res.msg , 'top');
      }
    },(err) => {
      this.notificationSrv.showToastMessage(err.msg, 'top');
    })
    // this.router.navigate(['', 'register', this.username]);
  }

  redirectToLogin() {
    this.router.navigate(['','login']);
  } 
}
