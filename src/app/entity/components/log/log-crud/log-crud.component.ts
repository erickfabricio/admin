import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { LogModel } from 'src/app/entity/models/log.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-entity-log-crud',
  templateUrl: './log-crud.component.html',
  styleUrls: ['./log-crud.component.css']
})
export class LogCrudComponent implements OnInit {

  //CRUD
  action: string;
  log: LogModel;

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
    this.title = "New log";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.log = null;
  }

  crud() {
    this.title = "Log";
    
    this.form.get('id').setValue(this.log._id);
    this.form.get('state').setValue(this.log.state);
    this.form.get('creationDate').setValue(this.log.creationDate);
    

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
      this.log = new LogModel();      
      this.log.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.save(LogModel.entity, this.log)
        .subscribe(log => { console.log("New log"); this.log = <LogModel>log; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New log: " + this.log._id;
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
      this.log.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.update(LogModel.entity, this.log)
        .subscribe(log => { console.log("Update log"); this.log = <LogModel>log });

      //Succes
      let succesMessage = "Update log: " + this.log._id;
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
    this.entityService.remove(LogModel.entity, this.log)
      .subscribe(log => { this.log = <LogModel>log; console.log("Delete log"); console.log(this.log); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete log: " + this.log._id;
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
