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

  roles: RoleModel[];

  @Input('userSession') userSession: UserModel;
  @Input('roleSession') roleSession: RoleModel;
  pc: PrivilegeCollectionModel;
    
  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'name', 'mail', 'state'];
    this.dataSource = new MatTableDataSource<UserModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    this.find();

    //Privileges
    console.log(this.roleSession);
    this.pc = this.roleSession.privileges.collections.find(c => c._id == UserModel.ID);
    console.log(this.pc);
  }

  find() {    
    this.entityService.find(UserModel.entity)
      .subscribe(users => { /*console.log(users);*/ this.users = <UserModel[]>users; this.dataSource.data = this.users });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, user: UserModel) {
    return this.eventCrud.emit({action, user});
  }

}
