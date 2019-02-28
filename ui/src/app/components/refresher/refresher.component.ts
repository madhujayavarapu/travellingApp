import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent {

  @Output() onRefresh = new EventEmitter();

  constructor() { }

  doRefresh(event){
    this.onRefresh.emit({event});
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
