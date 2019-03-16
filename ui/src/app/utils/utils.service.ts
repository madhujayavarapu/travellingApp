import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    
  ){}


  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return headers;
  }

}