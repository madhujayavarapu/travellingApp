import { UtilsService } from './../utils/utils.service';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: Http,
    private utilsSrv: UtilsService
  ) {}

  getCurrentTicketsOfCurrentUser(postData): Observable<any> {
    return this.http.post(URL+"getActiveTicketsOfUser",postData,{headers:this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));
  }

  getPastTicketsOfCurrentUser(postData): Observable<any> {
    return this.http.post(URL+"getPastTicketsOfUser",postData,{headers:this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));    
  }
}