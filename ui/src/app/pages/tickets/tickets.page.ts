import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage {

  ticketColor: string = "primary";
  currentSegment: string = 'current';
  tickets: Array<any> = [];

  constructor(
    private userSrv: UserService,
    private ticketSrv: TicketService
  ) { }

  ionViewWillEnter(){
    this.getAllTicketsOfUser('current');
  }

  getAllTicketsOfUser(type) {
    this.userSrv.getCurrentUserDetails('_id').subscribe((currentUserId) => {
      let postData = {userId: currentUserId};
      this.ticketSrv.getAllTicketsOfUser(postData).subscribe((res) => {
        this.tickets = !isNullOrUndefined(res.tickets) ? res.tickets : [];
        if(type == 'current'){
          this.getCurrentTickets();
        }else{
          this.getPastTickets();
        }
      }, (err) => {
        this.tickets = [];
      })
    })
  }

  segmentChanged(ev) {
    this.currentSegment = ev.detail.value;
    switch(ev.detail.value) {
      case 'current':
        this.getAllTicketsOfUser('current');
        break;
      case 'past':
        this.getAllTicketsOfUser('past');
        break;
      default:
        console.log('want to add more');
        break;
    }
  }

  getCurrentTickets() {
    this.tickets = this.tickets.filter((ticket) => ticket.color !== 'dark');
  }

  getPastTickets() {
    this.tickets = this.tickets.filter((ticket) => ticket.color === 'dark');
  }

  mapColorsToTickets(tickets) {
    tickets.forEach((ticket) => {
      let obj = {...ticket};
    })
    return tickets;
  }

}
