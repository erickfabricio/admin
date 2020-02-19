import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ModuleModel } from 'src/app/entity/models/module.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { RoleModel } from 'src/app/entity/models/role.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'admin-entity-module-crud',
  templateUrl: './module-crud.component.html',
  styleUrls: ['./module-crud.component.css']
})
export class ModuleCrudComponent implements OnInit {

  //CRUD
  action: string;
  module: ModuleModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

  //Session
  @Input('userSession') userSession: UserModel;
  @Input('privilegeCollectionSession') privilegeCollectionSession: PrivilegeCollectionModel;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,      
      name: true,
      description: true,
      state: true,
      creationDate: true            
    }
    this.createForm();
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
  }

  //************ FORM ************//

  create() {
    this.title = "New module";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.module = null;
  }

  crud() {
    this.title = "Module";
    
    this.form.get('id').setValue(this.module._id);    
    this.form.get('name').setValue(this.module.name);        
    this.form.get('description').setValue(this.module.description);    
    this.form.get('state').setValue(this.module.state);
    this.form.get('creationDate').setValue(formatDate(this.module.creationDate, 'MMM d, y, h:mm:ss a', 'en-US'));
    

    this.visibleControls = {
      id: true,
      name: true,
      description: true,
      state: true,
      creationDate: true      
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {

      //Assignment of values
      this.module = new ModuleModel();
      this.module.name = String(this.form.get('name').value).trim();
      this.module.description = String(this.form.get('description').value).trim();
      this.module.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.save(ModuleModel.entity, this.module)
        .subscribe(module => { console.log("New module"); this.module = <ModuleModel>module; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New module: " + this.module.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
      this.createForm();
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
      this.module.name = String(this.form.get('name').value).trim();
      this.module.description = String(this.form.get('description').value).trim();
      this.module.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.update(ModuleModel.entity, this.module)
        .subscribe(module => { console.log("Update module"); this.module = <ModuleModel>module });

      //Succes
      let succesMessage = "Update module: " + this.module.name;
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
    this.entityService.remove(ModuleModel.entity, this.module)
      .subscribe(module => { this.module = <ModuleModel>module; console.log("Delete module"); console.log(this.module); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete module: " + this.module.name;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {
    
    if(this.form.get('name').invalid){
      return this.getErrorMessageName();
    }

    if(this.form.get('description').invalid){
      return this.getErrorMessageDescription();
    }

    if(this.form.get('state').invalid){
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
