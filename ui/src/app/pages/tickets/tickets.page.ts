import { Component } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage {

  ticketColor: string = "primary";
  currentSegment: string = 'current';
  tickets: Array<any> = [
    {
      ticketInfo: {
        half: 1,
        full: 2
      }
    },
    {
      ticketInfo: {
        full: 2,
        senior: 1
      }
    },
    {
      ticketInfo: {
        full: 2,
        half: 1
      }
    },
    {
      ticketInfo: {
        full: 2,
        senior: 1,
        half: 1
      }
    },
    {
      ticketInfo: {
        half: 2,
        senior: 1
      }
    },
    {
      ticketInfo: {
        half: 1
      }
    },
    {
      ticketInfo: {
        senior: 1
      }
    },
    {
      ticketInfo: {
        full: 2
      }
    }
  ];

  constructor() { }

  ionViewWillEnter(){
    this.getCurrentTickets();
  }

  segmentChanged(ev) {
    this.currentSegment = ev.detail.value;
    switch(ev.detail.value) {
      case 'current':
        this.getCurrentTickets();
        break;
      case 'past':
        this.getPastTickets();
        break;
      default:
        console.log('want to add more');
        break;
    }
  }

  getCurrentTickets() {
    console.log('current ticket details');
    this.tickets = this.mapColorsToTickets(this.tickets);
  }

  getPastTickets() {
    console.log('past ticket details');
  }

  mapColorsToTickets(tickets) {
    tickets.forEach((ticket) => {
      let obj = {...ticket};
    })
    return tickets;
  }

}
