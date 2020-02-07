import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) { }

  valid: boolean = false;

  async canActivate() {
    if (localStorage.getItem("token")) {
      /*
      let resp = await this.sessionService.validate().subscribe(resp => {
        this.valid = resp.ok;
        console.log(resp);
      });
      console.log(this.valid);
      */
      return true;

    } else {

      this.router.navigate(['/login']);
      return false;
    }



  }

}
