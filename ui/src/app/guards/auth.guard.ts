import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSrv: UserService, private router: Router){}

  async canActivate(router){
    if(this.userSrv.isLoggedIn()){
      console.log('authenticated');
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
