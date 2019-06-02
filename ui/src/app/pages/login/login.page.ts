import { Component } from '@angular/core';
// import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notifications/notification.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    private userSrv: UserService,
    private router: Router,
    private notificationsSrv: NotificationService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
    ) { }

  ionViewWillEnter(){
    this.userSrv.logout();
    this.resetFields();
  }

  ionViewDidLeave(){
    this.resetFields();
  }

  async authenticateUser(){
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..Please wait',
      spinner: 'bubbles'
    });
    loading.present();
    let { username, password } = this;
    let credentials = {
      username,
      password
    }
    
    this.userSrv.authenticateUser(credentials).subscribe((res: any) => {
      if(res.status){
        loading.dismiss();
        this.notificationsSrv.showToastMessage('Welcome '+res.user.name, 'top');
        this.router.navigate(['','tabs']);
      }else{
        loading.dismiss();
        this.notificationsSrv.showToastMessage(res.msg, 'top');
      }
      this.resetFields();
    }, (err) => {
      this.notificationsSrv.showToastMessage(err.message, 'top');
      loading.dismiss();
      this.resetFields();
    });    
  }

  resetFields() {
    this.username = null;
    this.password = null;
  }

  isValidCredentials() {
    let {username, password} = this;
    username = !!username ? username.trim(): username;
    password = !!password ? password.trim() : password;
    if(!!username && !!password && username != "" && password != ""){
      return true;
    }
    return false;
  }

  forgotPassword() {
    console.log("need implement this functionality");
  }

  register() {
    this.router.navigate(['','verify-otp']);
  }

}
