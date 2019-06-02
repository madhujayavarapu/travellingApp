import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { URL } from '../config/url';
import { map } from 'rxjs/operators';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(
    private http: Http,
    private utilsSrv: UtilsService
  ){}

  getFromAndToList(): Observable<any> {
    return this.http.get(URL+"getAllRoutes",{headers: this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));
  }

  getBoardingPointsList(postData): Observable<any> {
    return this.http.post(URL+"getBoardingPoints",postData,{headers:this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));
  }

  getDroppingPointsList(postData): Observable<any> {
    return this.http.post(URL+"getDroppingPoints",postData,{headers:this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));
  }

  getFareDetailsForTrip(tripDetails): Observable<any> {
    return this.http.post(URL+"getFareDetailsForTrip", tripDetails, {headers: this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));
  }

  getBusDetails(postData): Observable<any> {
    return this.http.post(URL+"getBusDetails",postData, {headers: this.utilsSrv.getHeaders()}).pipe((map((res) => res.json())));
  }
  payment():Observable<any>{
    return this.http.post(URL+"checksumpayment").pipe((map((res) => res)));
  }
}
