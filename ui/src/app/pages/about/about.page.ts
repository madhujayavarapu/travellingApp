import { CONTACT_INFO } from './../../constants/proj.constant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  contactInfo: any = CONTACT_INFO || {};

  constructor() { }

  ngOnInit() {
  }

}
