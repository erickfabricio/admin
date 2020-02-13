import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { RoleModel } from 'src/app/entity/models/role.model';
import { CollectionModel } from 'src/app/entity/models/collection.model';
import { ModuleModel } from 'src/app/entity/models/module.model';


import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';
import { PrivilegeModuleModel } from 'src/app/entity/models/privilege.module.model';


@Component({
  selector: 'admin-entity-role-crud',
  templateUrl: './role-crud.component.html',
  styleUrls: ['./role-crud.component.css']
})
export class RoleCrudComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //CRUD
  action: string;
  role: RoleModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

  panelOpenState = false;

  //Modules
  modules: ModuleModel[];
  displayedColumnsModule: string[];
  dataSourceModule: MatTableDataSource<PrivilegeModuleModel>;
  privilegeModuleList: PrivilegeModuleModel[];

  //Collections
  collections: CollectionModel[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<PrivilegeCollectionModel>;
  privilegeCollectionList: PrivilegeCollectionModel[];

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      name: true,
      description: true,
      state: true,
      creationDate: true
    };

    this.createForm();

    //Modules
    this.displayedColumnsModule = ['module', 'access'];
    this.dataSourceModule = new MatTableDataSource<PrivilegeModuleModel>();
    this.dataSourceModule.paginator = this.paginator;
    this.dataSourceModule.sort = this.sort;
    this.findModule();

    //Collections
    this.displayedColumns = ['collection', 'create', 'read', 'update', 'delete'];
    this.dataSource = new MatTableDataSource<PrivilegeCollectionModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.findCollection();

  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      state: new FormControl('', [Validators.required]),
      creationDate: new FormControl({ value: '', disabled: true })
    });
  }

  findModule() {
    this.entityService.find(ModuleModel.entity)
      .subscribe(modules => { this.modules = <ModuleModel[]>modules });
  }

  findCollection() {
    this.entityService.find(CollectionModel.entity)
      .subscribe(collections => { this.collections = <CollectionModel[]>collections });
  }

  getPrivilege() {

    this.privilegeModuleList = [];
    this.privilegeCollectionList = [];

    //Compare
    switch (this.action) {

      case "CREATE":

        //Modules
        this.modules.forEach(module => {
          let privilegeModuleItem: PrivilegeModuleModel = new PrivilegeModuleModel();
          privilegeModuleItem._id = module._id;
          privilegeModuleItem.name = module.name;
          privilegeModuleItem.access = false;
          this.privilegeModuleList.push(privilegeModuleItem);
        });

        //Collections
        this.collections.forEach(collection => {
          let privilegeCollectionItem: PrivilegeCollectionModel = new PrivilegeCollectionModel();
          privilegeCollectionItem._id = collection._id;
          privilegeCollectionItem.name = collection.name;
          privilegeCollectionItem.create = false;
          privilegeCollectionItem.read = false;
          privilegeCollectionItem.update = false;
          privilegeCollectionItem.delete = false;
          this.privilegeCollectionList.push(privilegeCollectionItem);
        });
        break;

      case "CRUD":

        //Modules
        this.modules.forEach(module => {

          let pm: PrivilegeModuleModel;
          let privilegeModuleItem: PrivilegeModuleModel = new PrivilegeModuleModel();

          try {
            
            pm = this.role.privileges.modules.find(privilegeModule => privilegeModule._id == module._id);
            privilegeModuleItem._id = module._id;
            privilegeModuleItem.name = module.name;

            if (pm) {
              privilegeModuleItem.access = pm.access;
            } else {
              privilegeModuleItem.access = false;
            }
            
          } catch (ex) {
            console.log("No se puedo encontrar modulo:" + module.name);
            privilegeModuleItem.name = module.name;
            privilegeModuleItem.access = false;
            //console.log(ex);
          }

          this.privilegeModuleList.push(privilegeModuleItem);

        });

        //Collections
        this.collections.forEach(collection => {

          let pc: PrivilegeCollectionModel = this.role.privileges.collections.find(privilegeCollection => privilegeCollection._id == collection._id);

          let privilegeCollectionItem: PrivilegeCollectionModel = new PrivilegeCollectionModel();
          privilegeCollectionItem._id = collection._id;
          privilegeCollectionItem.name = collection.name;

          if (pc) {
            privilegeCollectionItem.create = pc.create;
            privilegeCollectionItem.read = pc.read;
            privilegeCollectionItem.update = pc.update;
            privilegeCollectionItem.delete = pc.delete;
          } else {
            privilegeCollectionItem.create = false;
            privilegeCollectionItem.read = false;
            privilegeCollectionItem.update = false;
            privilegeCollectionItem.delete = false;
          }

          this.privilegeCollectionList.push(privilegeCollectionItem);

        });
        break;
    }

    //console.log(this.privilegeModuleList);
    this.dataSourceModule.data = this.privilegeModuleList;

    //console.log(this.privilegeCollectionList);
    this.dataSource.data = this.privilegeCollectionList;
  }

  changePrivilegeCollection(option: string, privilegeCollectionModel: PrivilegeCollectionModel, value: boolean) {

    switch (option) {
      case "create":
        privilegeCollectionModel.create = value;
        break;
      case "read":
        privilegeCollectionModel.read = value;
        break;
      case "update":
        privilegeCollectionModel.update = value;
        break;
      case "delete":
        privilegeCollectionModel.delete = value;
        break;
    }

    console.log(privilegeCollectionModel);
  }

  changePrivilegeModule(privilegeModuleModel: PrivilegeModuleModel, value: boolean) {
    privilegeModuleModel.access = value;
    //console.log(privilegeModuleModel);
  }

  show() {
    //Action
    switch (this.action) {
      case "CREATE":
        this.create();
        break;
      case "CRUD":
        this.crud();
        break;
    }
    this.getPrivilege();
  }

  //************ FORM ************//

  create() {
    this.title = "New role";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.role = null;
  }

  crud() {
    this.title = "Role";

    this.form.get('id').setValue(this.role._id);
    this.form.get('name').setValue(this.role.name);
    this.form.get('description').setValue(this.role.description);
    this.form.get('state').setValue(this.role.state);
    this.form.get('creationDate').setValue(this.role.creationDate);


    this.visibleControls = {
      id: true,
      name: true,
      description: true,
      state: true,
      creationDate: true
    }

    //console.log(this.role);

  }

  //************ ACTIONS OF FORM ************//

  onCreate() {

    if (this.form.valid) {

      //Assignment of values
      this.role = new RoleModel();
      this.role.name = String(this.form.get('name').value).trim();
      this.role.description = String(this.form.get('description').value).trim();
      this.role.state = String(this.form.get('state').value).trim();

      let privileges = {
        modules: this.privilegeModuleList,
        collections: this.privilegeCollectionList        
      };

      this.role.privileges = privileges;
      this.role.validatePrivileges();

      //Api 
      this.entityService.save(RoleModel.entity, this.role)
        .subscribe(role => { console.log("New role"); this.role = <RoleModel>role; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New role: " + this.role.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
      this.createForm();
      this.getPrivilege();
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onUpdate() {
    //Check if there were changes    
    if (this.form.valid) {
      //Assignment of values
      this.role.name = String(this.form.get('name').value).trim();
      this.role.description = String(this.form.get('description').value).trim();
      this.role.state = String(this.form.get('state').value).trim();

      let privileges = {
        modules: this.privilegeModuleList,
        collections: this.privilegeCollectionList
      };

      this.role.privileges = privileges;

      RoleModel.validatePrivileges(this.role);
      //this.role.validatePrivileges();

      //Api 
      this.entityService.update(RoleModel.entity, this.role)
        .subscribe(role => { console.log("Update role"); this.role = <RoleModel>role });

      //Succes
      let succesMessage = "Update role: " + this.role.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onDelete() {
    this.action = "DELETE";

    //Api
    this.entityService.remove(RoleModel.entity, this.role)
      .subscribe(role => { this.role = <RoleModel>role; console.log("Delete role"); console.log(this.role); this.eventUpdateListEmitter(true) });

    //Succes
    let succesMessage = "Delete role: " + this.role.name;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('name').invalid) {
      return this.getErrorMessageName();
    }

    if (this.form.get('description').invalid) {
      return this.getErrorMessageDescription();
    }

    if (this.form.get('state').invalid) {
      return this.getErrorMessageState();
    }

  }

  getErrorMessageName() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
    if (this.form.get('name').hasError('minlength')) {
      return `Minimum length is ${this.form.get('name').errors.minlength.requiredLength} characters`;
    }
  }

  getErrorMessageDescription() {
    if (this.form.get('description').hasError('required')) {
      return 'Description is required';
    }
    if (this.form.get('description').hasError('minlength')) {
      return `Minimum length is ${this.form.get('description').errors.minlength.requiredLength} characters`;
    }
  }

  getErrorMessageState() {
    if (this.form.get('state').hasError('required')) {
      return 'State is required';
    }
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(
      message,
      action,
      {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: [style]
      }
    );
  }

  //************ EVENTS ************//
  //Process
  @Output() eventUpdateList = new EventEmitter<boolean>();
  eventUpdateListEmitter(isUpdate: boolean) {
    if (isUpdate) {
      this.eventUpdateList.emit(isUpdate);
    }
  }

}


interface ItemCollectionPrivilegeInterface {
  collection: string,
  view: boolean,
  edit: boolean,
  delete: boolean
}