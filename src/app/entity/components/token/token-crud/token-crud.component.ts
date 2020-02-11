import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { TokenModel } from 'src/app/entity/models/token.model';

@Component({
  selector: 'admin-entity-token-crud',
  templateUrl: './token-crud.component.html',
  styleUrls: ['./token-crud.component.css']
})
export class TokenCrudComponent implements OnInit {

  //CRUD
  action: string;
  token: TokenModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

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
    this.title = "New token";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.token = null;
  }

  crud() {
    this.title = "Token";
    
    this.form.get('id').setValue(this.token._id);
    this.form.get('state').setValue(this.token.state);
    this.form.get('creationDate').setValue(this.token.creationDate);
    

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
      this.token = new TokenModel();      
      this.token.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.save(TokenModel.entity, this.token)
        .subscribe(token => { console.log("New token"); this.token = <TokenModel>token; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New token: " + this.token._id;
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
      this.token.state = String(this.form.get('state').value).trim();
      
      //Api 
      this.entityService.update(TokenModel.entity, this.token)
        .subscribe(token => { console.log("Update token"); this.token = <TokenModel>token });

      //Succes
      let succesMessage = "Update token: " + this.token._id;
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
    this.entityService.remove(TokenModel.entity, this.token)
      .subscribe(token => { this.token = <TokenModel>token; console.log("Delete token"); console.log(this.token); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete token: " + this.token._id;
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
