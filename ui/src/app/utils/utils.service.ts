import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    
  ){}

  getHeaders(protectedRoute){
    // let token = this.getToken();
    let headers = new Headers();
    if(protectedRoute){
      // headers.append('Authorization',token);
    }
    headers.append('Content-Type','application/json');
    return headers;
  }

}