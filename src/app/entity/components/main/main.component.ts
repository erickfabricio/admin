import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { PrivilegeCollectionModel } from '../../models/privilege.collection.model';
import { RoleModel } from '../../models/role.model';

@Component({
  selector: 'admin-entity-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class EntityMainComponent implements OnInit {

  //Session
  @Input('userSession') userSession: UserModel;
  @Input('roleSession') roleSession: RoleModel;
  
  constructor() { }

  ngOnInit() {
  }

  getPrivilege(collectionName: string): PrivilegeCollectionModel{
    return this.roleSession.privileges.collections.find(c => c.name == collectionName);
  }

}
