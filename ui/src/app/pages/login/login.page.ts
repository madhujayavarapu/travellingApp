import { Component } from '@angular/core';
// import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notifications/notification.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    // private userSrv: UserService,
    private router: Router,
    private notificationsSrv: NotificationService,
    private loadingCtrl: LoadingController
    ) { }

  ionViewWillEnter(){
    // this.userSrv.logOutUser().then(() => {

    // }).catch((err) => {
    //   this.notificationsSrv.showToastMessage(err.message, 'top');
    // })
    this.username = null;
    this.password = null;
  }

  ionViewDidLeave(){
    this.username = null;
    this.password = null;
  }

  async authenticateUser(){
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..Please wait',
      spinner: 'dots'
    });
    loading.present();
    let { username, password } = this;
    let credentials = {
      username,
      password
    }
    // this.userSrv.authenticateUser(credentials).then((res: any) => {
    //   if(res.success){
    //     loading.dismiss();
    //     this.notificationsSrv.showToastMessage('Welcome '+username, 'top');
    //     this.router.navigate(['','tabs']);
    //   }else{
    //     loading.dismiss();
    //   }
    // }).catch((err) => {
    //   this.notificationsSrv.showToastMessage(err.error.message, 'top');
    //   loading.dismiss();
    // })
    
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
    console.log("forgot password reset password");
  }

  register() {
    this.router.navigate(['','register']);
  }

}