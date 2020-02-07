import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserListComponent } from '../user-list/user-list.component';
import { UserCrudComponent } from '../user-crud/user-crud.component';

@Component({
  selector: 'admin-entity-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  @ViewChild("tabGroup", { static: true }) tabGroup;
  @ViewChild("tabList", { static: true }) tabList;
  @ViewChild("list", { static: true }) list: UserListComponent;
  @ViewChild("tabCrud", { static: true }) tabCrud;
  @ViewChild("crud", { static: true }) crud: UserCrudComponent;
  view: string;

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
      //console.log(data.user);

      //Send data to CRUD
      this.crud.action = data.action;
      this.crud.user = data.user;
      this.crud.show();

      //Change and enable tag      
      this.tabCrud.textLabel = "User";
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
