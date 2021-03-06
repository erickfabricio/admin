import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ModuleListComponent } from '../module-list/module-list.component';
import { ModuleCrudComponent } from '../module-crud/module-crud.component';
import { UserModel } from 'src/app/entity/models/user.model';
import { RoleModel } from 'src/app/entity/models/role.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-entity-module-main',
  templateUrl: './module-main.component.html',
  styleUrls: ['./module-main.component.css']
})
export class ModuleMainComponent implements OnInit {

  @ViewChild("tabGroup", { static: true }) tabGroup;
  @ViewChild("tabList", { static: true }) tabList;
  @ViewChild("list", { static: true }) list: ModuleListComponent;
  @ViewChild("tabCrud", { static: true }) tabCrud;
  @ViewChild("crud", { static: true }) crud: ModuleCrudComponent;
  view: string;

  //Session
  @Input('userSession') userSession: UserModel;
  @Input('privilegeCollectionSession') privilegeCollectionSession: PrivilegeCollectionModel;

  constructor() { }

  ngOnInit() {
    this.view = "LIST";
    this.captureEventList();
    this.captureEventCrud();    
  }

  captureEventList() {
    this.list.eventCrud.pipe().subscribe(data => {
      //Data      
      //console.log(data.action);
      //console.log(data.module);

      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.module = data.module;
      this.crud.show();

      //Change and enable tag      
      this.tabCrud.textLabel = "Module";
      this.tabCrud.disabled = false;
      this.tabGroup.selectedIndex = 1;

      //Show mat-tab-header
      this.view = "CRUD";

    });
  }

  captureEventCrud() {
    this.crud.eventUpdateList.pipe().subscribe(isUpdateList => {
      //Data
      //console.log("Update list:" + isUpdateList);
      
      if (isUpdateList) {
        this.list.find();
      };

      if (this.crud.action == "DELETE") {
        this.tabGroup.selectedIndex = 0;
      }
      
    });    
  }

  onChangeTab(event: MatTabChangeEvent) {
    //console.log("Tag change:" + event.tab.textLabel);
    if (this.tabGroup.selectedIndex == 0) {
      this.tabCrud.textLabel = "";
      this.tabCrud.disabled = true;
      this.view = "LIST";
    }
  }  

}
