import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ionViewWillEnter() {
    console.log("view entered need to fetch the user details");
    this.getUserInfo();
  }

  chooseFile() {
    this.fileButtonRef.nativeElement.click();
  }

  getUserInfo() {
    this.userDetails = {
      displayName: "madhu",
      profilePic: 'assets/images/default.jpeg'
    }
  }

  pageRefreshed(event) {
    console.log("page refreshed: ",event);
  }



  updateProfilePic() {
    console.log("upload profile pic");
  }

  logOut(){
    this.router.navigate(['', 'login']);
    // this.userSrv.logOutUser().then((res) => {
    //   if(res) {
    //     this.notificationsSrv.showToastMessage('Logged Out!!', 'top');
    //     this.router.navigate(['', 'login']);
    //   }else {
    //     this.notificationsSrv.showToastMessage('Something went wrong', 'top');
    //   }
    // }).catch((err) => {
    //   this.notificationsSrv.showToastMessage(err.message, 'top');
    // })
  }

}
