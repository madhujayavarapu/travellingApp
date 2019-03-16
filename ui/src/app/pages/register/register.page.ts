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
    private loadingCtrl: LoadingController
  ) {
    this.username = route.params['username'];
   }

  ionViewWillEnter() {
    this.resetAllFields();
  }

  ionViewDidLeave() {
    this.resetAllFields();
  }

  resetAllFields() {
    this.username = null;
    this.password = null;
    this.fullName = null;
    this.confirmpwd = null;
    this.gender = "";
  }

  isValidCredentials(){
    let {username, password, fullName, confirmpwd, gender} = this;
    if(!!username && username != '' && !!password && password != '' && !!fullName && fullName != ''
     && !!confirmpwd && confirmpwd != '' && password == confirmpwd && !!gender && gender != ""){
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
    console.log(username, password, fullName, confirmpwd, gender);
    let obj = {
      username,
      password,
      fullName,
      confirmpwd,
      gender
    }
    console.log(obj);
    // this.userSrv.addUseDetails(obj).then((res) => {
    //   this.loading.dismiss();
    //   if(res){
    //     this.notificationsSrv.showToastMessage('Details Saved','top');
    //     this.router.navigate(['','profilepic']);
    //   }else{
    //     this.notificationsSrv.showToastMessage('Something went wrong..please try again', 'top');
    //   }
    // }).catch((err) => {
    //   this.loading.dismiss();
    //   this.notificationsSrv.showToastMessage(err.message, 'top');
    //   this.resetAllFields();
    // })
  }

  gotoLogin() {
    this.router.navigate(['','login']);
  }
}
