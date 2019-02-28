import { Injectable } from '@angular/core';
import { URL } from '../../config/url';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: Http
  ) { }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return headers;
  }

  addUserDetails(newUserDetails): Observable<any> {
    return this.http.post(URL+"", newUserDetails, {headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  authenticateUser(creadentials): Observable<any> {
    return this.http.post(URL+"", creadentials, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  validateOtp(postData): Observable<any> {
    return this.http.post(URL+"", postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  verifyUsername(postData): Observable<any> {
    return this.http.post(URL+"verifyUsername", postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));    
  }
}
