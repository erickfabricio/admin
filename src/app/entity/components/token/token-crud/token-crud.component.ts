import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { TokenModel } from 'src/app/entity/models/token.model';
import { RoleModel } from 'src/app/entity/models/role.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';
import { format } from 'url';
import { formatDate } from '@angular/common';

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
  
  //Session
  @Input('userSession') userSession: UserModel;
  @Input('privilegeCollectionSession') privilegeCollectionSession: PrivilegeCollectionModel;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      generation: true,
      time: true,
      key: true,
      playload: true,
      token: true,
      signOut: true,
      state: true,
      creationDate: true
    }
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      generation: new FormControl({ value: '', disabled: true }),
      time: new FormControl({ value: '', disabled: true }),
      key: new FormControl({ value: '', disabled: true }),
      playload: new FormControl({ value: '', disabled: true }),
      token: new FormControl({ value: '', disabled: true }),
      signOut: new FormControl({ value: '', disabled: true }),
      state: new FormControl('', [Validators.required]),
      creationDate: new FormControl({ value: '',  disabled: true })
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
    this.visibleControls.generation = false;
    this.visibleControls.time = false;
    this.form.reset();
    this.token = null;
  }

  crud() {
    this.title = "Token";

    this.form.get('id').setValue(this.token._id);
    this.form.get('generation').setValue(this.token.generation);
    this.form.get('time').setValue(this.token.time);
    this.form.get('key').setValue(this.token.key);
    this.form.get('playload').setValue(this.token.playload);
    this.form.get('token').setValue(this.token.token);
    this.form.get('signOut').setValue(formatDate(this.token.signOut, 'MMM d, y, h:mm:ss a', 'en-US'));   
    this.form.get('state').setValue(this.token.state);
    this.form.get('creationDate').setValue(formatDate(this.token.creationDate, 'MMM d, y, h:mm:ss a', 'en-US'));
    
    this.visibleControls = {
      id: true,
      generation: true,
      time: true,
      key: true,
      playload: true,
      token: true,
      signOut: true,
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

    if (this.form.get('generation').invalid) {
      return this.getErrorMessageGeneration();
    }

    if (this.form.get('state').invalid) {
      return this.getErrorMessageState();
    }

  }

  getErrorMessageGeneration() {

    if (this.form.get('generation').hasError('required')) {
      return 'Generation is required';
    }

    if (this.form.get('generation').hasError('minlength')) {
      return `Minimum length is ${this.form.get('generation').errors.minlength.requiredLength} characters`;
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
