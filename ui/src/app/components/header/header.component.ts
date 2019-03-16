import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title: string;
  @Input() link: string;
  @Input() backBtn: boolean;
  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  goBack() {
    let path = [''];
    path = path.concat(this.link.split(','));
    this.router.navigate(path);
    // console.log(this.link.split(','));
  }
}
