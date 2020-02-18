import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { AppModel } from 'src/app/entity/models/app.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-entity-app-crud',
  templateUrl: './app-crud.component.html',
  styleUrls: ['./app-crud.component.css']
})
export class AppCrudComponent implements OnInit {

  //CRUD
  action: string;
  app: AppModel;

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
      state: true,
      creationDate: true            
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),      
      //name: new FormControl('', [Validators.required, Validators.minLength(5)]),      
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
    this.title = "New app";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.app = null;
  }

  crud() {
    this.title = "App";
    
    this.form.get('id').setValue(this.app._id);
    this.form.get('state').setValue(this.app.state);
    this.form.get('creationDate').setValue(this.app.creationDate);
    

    this.visibleControls = {
      id: true,      
      state: true,
      creationDate: true      
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {

      //Assignment of values
      this.app = new AppModel();      
      this.app.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.save(AppModel.entity, this.app)
        .subscribe(app => { console.log("New app"); this.app = <AppModel>app; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New app: " + this.app._id;
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
      this.app.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.update(AppModel.entity, this.app)
        .subscribe(app => { console.log("Update app"); this.app = <AppModel>app });

      //Succes
      let succesMessage = "Update app: " + this.app._id;
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
    this.entityService.remove(AppModel.entity, this.app)
      .subscribe(app => { this.app = <AppModel>app; console.log("Delete app"); console.log(this.app); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete app: " + this.app._id;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {
    if(this.form.get('state').invalid){
      return this.getErrorMessageState();
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
