import { UserService } from './../../services/user/user.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  @ViewChild('fileButton') fileButtonRef;
  userDetails;
  profilePic: string = '';

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
    this.userSrv.getCurrentUserDetails('storedDetailsAll').subscribe((res) => {
      console.log(res);
    });
    this.userDetails = {
      displayName: "Test User",
      profilePic: 'assets/images/default.jpeg'
    }

  }

  pageRefreshed(event) {
    // console.log("page refreshed: ",event);
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
