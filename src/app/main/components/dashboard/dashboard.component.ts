import { Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { EntityService } from 'src/app/entity/services/entity.service';
import { RoleModel } from 'src/app/entity/models/role.model';
import { UserModel } from 'src/app/entity/models/user.model';


@Component({
  selector: 'mail-main-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {

  option: string;
  
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  user: UserModel;
  role: RoleModel;

  showModules: boolean;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private entityService: EntityService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.option = "main";


    //User
    let userJSON = JSON.parse(localStorage.getItem("user"));
    this.user = new UserModel();
    this.user._id = userJSON._id;
    this.user.name = userJSON.name;

    //Role
    let roleJSON = JSON.parse(localStorage.getItem("role"));
    this.role = new RoleModel();
    this.role._id = roleJSON._id;
    this.role.name = roleJSON.name;
    this.role.privileges = roleJSON.privileges;

    console.log(this.user);
    console.log(this.role);
    
    this.showModules = this.role.privileges.modules.find(r => r.name = "Modules").access;
    console.log(this.showModules);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  viewOption(option: string){
    this.option = option;
    //console.log(this.option);
  }

  /*

  getPrivileges() {    
    this.entityService.find(RoleModel.entity)
      .subscribe(role => { console.log(collections); this.role = <CollectionModel[]>collections; this.dataSource.data = this.collections });
  }*/
  

}


