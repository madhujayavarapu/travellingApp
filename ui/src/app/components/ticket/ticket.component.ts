import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[appTickets]',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  // inputs: ['color', 'data']
})
export class TicketComponent implements OnInit {

  @Input() tickets: Array<any>;

  constructor() { }

  ngOnInit() {}

}
