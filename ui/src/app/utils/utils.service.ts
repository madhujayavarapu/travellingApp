import { COLOR_MAPPING_TICKET } from './../constants/proj.constant';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(){}

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return headers;
  }

  getColorMappingForTicket(ticket): string {
    let ticketInfo = ticket;
    let key = "";
    key = !isNullOrUndefined(ticketInfo.half) && ticketInfo.half > 0 ? '1' : '';
    key += !isNullOrUndefined(ticketInfo.full) && ticketInfo.full > 0 ? '2' : '';
    key += !isNullOrUndefined(ticketInfo.senior) && ticketInfo.senior > 0 ? '3' : '';

    let colorMappings = JSON.parse(JSON.stringify(COLOR_MAPPING_TICKET));
    return colorMappings[key];
  }

  convertSecondsToMinutes(seconds: number): string {
    let minutes = Math.floor(seconds/60);
    let s = seconds%60;
    return this.getTimeUnitFormat(minutes)+':'+this.getTimeUnitFormat(s);
  }

  getTimeUnitFormat(time): string {
    return !isNullOrUndefined(time) ? ('0'+time).slice(-2) : '00';
  }

}