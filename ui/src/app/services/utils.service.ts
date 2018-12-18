import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private toastrSrv: ToasterService
    ){}


    showToastMsg(type, title, body){
        let toast: Toast = {
            type: type,
            title: title,
            body: body,
            showCloseButton: true
        };
        this.toastrSrv.pop(toast);
    }
}