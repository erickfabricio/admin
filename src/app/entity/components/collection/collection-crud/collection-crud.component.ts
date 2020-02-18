import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { CollectionModel } from 'src/app/entity/models/collection.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-entity-collection-crud',
  templateUrl: './collection-crud.component.html',
  styleUrls: ['./collection-crud.component.css']
})
export class CollectionCrudComponent implements OnInit {

  //CRUD
  action: string;
  collection: CollectionModel;

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
    this.title = "New collection";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.collection = null;
  }

  crud() {
    this.title = "Collection";
    
    this.form.get('id').setValue(this.collection._id);    
    this.form.get('name').setValue(this.collection.name);        
    this.form.get('description').setValue(this.collection.description);    
    this.form.get('state').setValue(this.collection.state);
    this.form.get('creationDate').setValue(this.collection.creationDate);
    

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
      this.collection = new CollectionModel();
      this.collection.name = String(this.form.get('name').value).trim();
      this.collection.description = String(this.form.get('description').value).trim();
      this.collection.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.save(CollectionModel.entity, this.collection)
        .subscribe(collection => { console.log("New collection"); this.collection = <CollectionModel>collection; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New collection: " + this.collection.name;
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
      this.collection.name = String(this.form.get('name').value).trim();
      this.collection.description = String(this.form.get('description').value).trim();
      this.collection.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.update(CollectionModel.entity, this.collection)
        .subscribe(collection => { console.log("Update collection"); this.collection = <CollectionModel>collection });

      //Succes
      let succesMessage = "Update collection: " + this.collection.name;
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
    this.entityService.remove(CollectionModel.entity, this.collection)
      .subscribe(collection => { this.collection = <CollectionModel>collection; console.log("Delete collection"); console.log(this.collection); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete collection: " + this.collection.name;
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
