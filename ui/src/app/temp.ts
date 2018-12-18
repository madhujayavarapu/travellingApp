import { Component, OnInit } from '@angular/core';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-temp',
  template: '<h1>Hello this is temp page..Setup is Done You can start working on it.</h1>'
})
export class TempComponent implements OnInit{
  constructor(
    private utilsSrv: UtilsService
  ){}

  ngOnInit(){
    this.utilsSrv.showToastMsg("success","Setup Info","All done..Start working on it");
  }
}