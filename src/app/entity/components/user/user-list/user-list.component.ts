import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';
import { RoleModel } from 'src/app/entity/models/role.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-entity-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<UserModel>;

  //List
  users: UserModel[];

  //Auxiliar
  roles: RoleModel[] = [];

  //Session
  @Input('userSession') userSession: UserModel;
  @Input('privilegeCollectionSession') privilegeCollectionSession: PrivilegeCollectionModel;

  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'name', 'mail', 'role', 'creation', 'state'];
    this.dataSource = new MatTableDataSource<UserModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.find();
    this.findRoles();
  }

  find() {
    this.entityService.find(UserModel.entity)
      .subscribe(users => { /*console.log(users);*/ this.users = <UserModel[]>users; this.dataSource.data = this.users });
  }

  findRoles() {
    this.entityService.find(RoleModel.entity)
      .subscribe(roles => { this.roles = <RoleModel[]>roles });
  }

  getRole(user: UserModel): String {
    let roleName = "";
    let role: RoleModel = this.roles.find(r => r._id == user.role);
    //console.log(role);
    if (role) {
      roleName = role.name;
    }
    return roleName;
  }

  getCreator(user: UserModel): UserModel {
    let creator: UserModel = this.users.find(u => u._id == user.creator);
    //console.log(creator);
    return creator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, user: UserModel) {
    
    let creator: UserModel;

    if (action == "CREATE") {
      creator = this.userSession;
    } else {
      creator = this.getCreator(user);      
    }

    return this.eventCrud.emit({ action, user, creator });
  }

}
