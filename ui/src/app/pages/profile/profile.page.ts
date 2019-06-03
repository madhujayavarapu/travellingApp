import { DEFAULT_PROFILE_PIC_URL } from './../../constants/proj.constant';
import { UserService } from './../../services/user/user.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  @ViewChild('fileButton') fileButtonRef;
  userDetails;
  profilePic: string = '';
  defaultProfilePic: string = DEFAULT_PROFILE_PIC_URL;

  constructor(
    private router: Router,
    private userSrv: UserService,
    private notificationSrv: NotificationService
  ) { }

  ionViewWillEnter() {
    this.getUserInfo();
  }

  chooseFile() {
    this.fileButtonRef.nativeElement.click();
  }

  getUserInfo() {
    this.userSrv.getCurrentUserDetails('all').subscribe((res) => {
      // console.log(res);
      if(res.status){
        this.userDetails = res.data;
      }
    },(err) => {
      console.log('err: ',err);
    });
  }

  pageRefreshed(event) {
    this.getUserInfo();
  }

  updateProfilePic() {
    console.log("upload profile pic");
  }

  logOut(){
    this.userSrv.logout();
    this.notificationSrv.showToastMessage('Logged Out!!', 'top');
    this.router.navigate(['', 'login']);
  }

}
