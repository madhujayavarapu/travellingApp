import { Injectable } from '@angular/core';
import { URL } from '../../config/url';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CurrentUser } from '../../models/currentUser';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private User: CurrentUser;

  constructor(
    private http: Http
  ) { }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return headers;
  }

  addUserDetails(newUserDetails): Observable<any> {
    return this.http.post(URL+"users/createUser", newUserDetails, {headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  authenticateUser(creadentials): Observable<any> {
    return this.http.post(URL+"authenticateUser", creadentials, {headers: this.getHeaders()}).pipe((map((res: any) => {
      let data = res.json();
      if(data.status){
        this.storeUserDetails(data.user);
      }
      return res.json();
    })));
  }

  validateOtp(postData): Observable<any> {
    return this.http.post(URL+"validateOtp", postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  verifyUsername(postData): Observable<any> {
    return this.http.post(URL+"verifyUsername", postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));    
  }

  updateProfile(postData): Observable<any> {
    return this.http.post(URL+"", postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }


  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    return !isNullOrUndefined(user) ? true : false;
  }

  logout(): boolean {
    localStorage.removeItem('user');
    return true;
  }

  storeUserDetails(userData) {
    console.log(userData," is userData to store");
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getCurrentUserDetails(type): Observable<any> {
    let userDetails = localStorage.getItem('user');
    if(!isNullOrUndefined(userDetails)){
      userDetails = JSON.parse(userDetails);
      if(type == 'all'){
        return this.http.post(URL+'getUserInfo', userDetails, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
      }else if(type == 'storedDetailsAll'){
        return of(userDetails);
      }else{
        return (!isNullOrUndefined(type) && !isNullOrUndefined(userDetails[type])) ? of(userDetails[type]) : of(null);
      }
    }else{
      return of(null);
    }
  }
}
