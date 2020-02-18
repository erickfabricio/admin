import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { DataModel } from 'src/app/entity/models/data.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-entity-data-crud',
  templateUrl: './data-crud.component.html',
  styleUrls: ['./data-crud.component.css']
})
export class DataCrudComponent implements OnInit {

  //CRUD
  action: string;
  data: DataModel;

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
    this.title = "New data";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.data = null;
  }

  crud() {
    this.title = "Data";
    
    this.form.get('id').setValue(this.data._id);
    this.form.get('state').setValue(this.data.state);
    this.form.get('creationDate').setValue(this.data.creationDate);
    

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
      this.data = new DataModel();      
      this.data.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.save(DataModel.entity, this.data)
        .subscribe(data => { console.log("New data"); this.data = <DataModel>data; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New data: " + this.data._id;
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
      this.data.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.update(DataModel.entity, this.data)
        .subscribe(data => { console.log("Update data"); this.data = <DataModel>data });

      //Succes
      let succesMessage = "Update data: " + this.data._id;
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
    this.entityService.remove(DataModel.entity, this.data)
      .subscribe(data => { this.data = <DataModel>data; console.log("Delete data"); console.log(this.data); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete data: " + this.data._id;
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
