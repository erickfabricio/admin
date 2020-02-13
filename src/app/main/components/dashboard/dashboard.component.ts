import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { EntityService } from 'src/app/entity/services/entity.service';
import { RoleModel } from 'src/app/entity/models/role.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { PrivilegeModuleModel } from 'src/app/entity/models/privilege.module.model';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
//const jwt = require('jsonwebtoken');
//const jwt = require('jsonwebtoken');

@Component({
  selector: 'mail-main-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  option: string;
  userSession: UserModel;
  roleSession: RoleModel;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private entityService: EntityService, private router: Router, private sessionService: SessionService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.option = "main";

    this.userSession = new UserModel();
    this.validate();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  viewOption(option: string) {
    this.option = option;
    //console.log(this.option);
  }

  isAccessModule(module: string) {
    try {
      let access = this.roleSession.privileges.modules.find(r => r.name == module).access;
      //console.log(access);
      return access;
    } catch (ex) {
      //console.log("Modulo: " + module + ", no definido");
      return false;
    }
  }

  signOut() {
    //Api      
    this.sessionService.signOut().subscribe(resp => {
      console.log(resp);
      localStorage.clear();
      this.router.navigate(['login']);
    });
  }

  validate() {
    //Api      
    this.sessionService.validate().subscribe(resp => {
      console.log(resp);
      if (resp.ok) {
        this.userSession = resp.data.user;
        this.roleSession = resp.data.role;
      } else {
        //localStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }

}


