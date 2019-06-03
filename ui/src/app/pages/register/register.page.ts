import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
// import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notifications/notification.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss', '../login/login.page.scss'],
})
export class RegisterPage {

  username: string;
  password: string;
  fullName: string;
  confirmpwd: string;
  gender: string;

  maleImg: string = 'assets/icon/male.svg';
  femaleImg: string = 'assets/icon/female.svg';

  loading;
  constructor(
    // private userSrv: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationsSrv: NotificationService,
    private loadingCtrl: LoadingController,
    private userSrv: UserService
  ) {
    this.username = route.snapshot.params['username'];
   }

  ionViewWillEnter() {
    this.resetAllFields();
  }

  ionViewDidLeave() {
    this.resetAllFields();
  }

  resetAllFields() {
    // this.username = null;
    this.password = null;
    this.fullName = null;
    this.confirmpwd = null;
    this.gender = "-1";
  }

  isValidCredentials(){
    let {username, password, fullName, confirmpwd, gender} = this;
    if(!!username && username != '' && !!password && password != '' && !!fullName && fullName != ''
     && !!confirmpwd && confirmpwd != '' && password == confirmpwd && !!gender && gender != "-1"){
      return true;
    }
    return false;
  }


  changeGender(g) {
    this.gender = g;
    this.maleImg = (g == 'M') ? 'assets/icon/male_selected.svg' : 'assets/icon/male.svg';
    this.femaleImg = (g == 'F') ? 'assets/icon/female_selected.svg' : 'assets/icon/female.svg';
  }

  async registerUserDetails() {
    this.loading = await this.loadingCtrl.create({
      message: 'Saving Details..Please wait',
      spinner: 'dots'
    })
    this.loading.present();
    let {username, password, fullName, confirmpwd, gender} = this;
    let obj = {
      username,
      password,
      name: fullName,
      confirmpwd,
      gender
    }
    if(obj.password === obj.confirmpwd) {
      this.userSrv.addUserDetails(obj).subscribe((res) => {
        this.loading.dismiss();
        if(res){
          this.notificationsSrv.showToastMessage('Details Saved','top');

          this.router.navigate(['','tabs', 'home']);
        }else{
          this.notificationsSrv.showToastMessage('Something went wrong..please try again', 'top');
        }
      },(err) => {
        this.loading.dismiss();
        this.notificationsSrv.showToastMessage(err.msg, 'top');
        this.resetAllFields();
      })
    }else{
      this.notificationsSrv.showToastMessage("Passwords doesn't match", 'top');
    }
  }

  gotoLogin() {
    this.router.navigate(['','login']);
  }
}
