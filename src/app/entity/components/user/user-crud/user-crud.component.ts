import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';
import { RoleModel } from 'src/app/entity/models/role.model';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'admin-entity-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  //CRUD
  action: string;
  user: UserModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

  //Aux
  roles: RoleModel[];
  creator: UserModel;

  //Session
  @Input('userSession') userSession: UserModel;
  @Input('privilegeCollectionSession') privilegeCollectionSession: PrivilegeCollectionModel;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "CRUD";
    this.visibleControls = {
      id: true,
      name: true,
      mail: true,
      hash: true,
      password: true,
      description: true,
      creationDate: true,
      state: true,
      role: true,
      creator: true

    }
    this.findRoles();
    this.createForm();

  }

  findRoles() {
    this.entityService.find(RoleModel.entity)
      .subscribe(roles => { /*console.log(roles);*/ this.roles = <RoleModel[]>roles });
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      hash: new FormControl({ value: '', disabled: true }),
      password: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      creationDate: new FormControl({ value: '', disabled: true }),
      state: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      creator: new FormControl({ value: '', disabled: true })
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
    this.title = "New user";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.user = null;
  }

  crud() {
    this.title = "User";

    this.form.get('id').setValue(this.user._id);
    this.form.get('name').setValue(this.user.name);
    this.form.get('mail').setValue(this.user.mail);
    this.form.get('hash').setValue(this.user.hash);
    this.form.get('password').setValue(this.user.password);
    this.form.get('description').setValue(this.user.description);
    this.form.get('creationDate').setValue(formatDate(this.user.creationDate, 'MMM d, y, h:mm:ss a', 'en-US'));
    this.form.get('state').setValue(this.user.state);

    this.form.get('role').setValue(this.user.role);
    this.form.get('creator').setValue(`${this.creator._id} - ${this.creator.name}`);

    this.visibleControls = {
      id: true,
      name: true,
      mail: true,
      hash: true,
      password: true,
      description: true,
      creationDate: true,
      state: true,
      role: true,
      creator: true
    }
  }

  //************ ACTIONS OF FORM ************//

  onCreate() {
    if (this.form.valid) {

      //Assignment of values
      this.user = new UserModel();
      this.user.name = String(this.form.get('name').value).trim();
      this.user.mail = String(this.form.get('mail').value).trim();
      this.user.password = String(this.form.get('password').value).trim();
      this.user.description = String(this.form.get('description').value).trim();
      this.user.state = String(this.form.get('state').value).trim();
      this.user.role = String(this.form.get('role').value).trim();
      this.user.creator = this.userSession._id;

      //Api      
      this.entityService.request('post', UserModel.entity, this.user)
        .subscribe(res => {
          console.log(res);
          if (res.ok) {
            //Success
            this.user = <UserModel>res.user;
            let succesMessage = "New user: " + this.user.name;
            this.openSnackBar(succesMessage, "X", "snackbar-success");
            this.createForm();
            this.eventUpdateListEmitter(true);
          } else {
            //Error
            let errorMessage = "¡Error, " + res.menssage + "!";
            this.openSnackBar(errorMessage, "X", "snackbar-danger");
          }          
        });

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
      this.user.name = String(this.form.get('name').value).trim();
      this.user.mail = String(this.form.get('mail').value).trim();
      this.user.password = String(this.form.get('password').value).trim();
      this.user.description = String(this.form.get('description').value).trim();
      this.user.state = String(this.form.get('state').value).trim();

      console.log(String(this.form.get('role').value).trim());
      this.user.role = String(this.form.get('role').value).trim();

      //Api      
      this.entityService.request('put', UserModel.entity, this.user)
        .subscribe(res => {
          console.log(res);
          if (res.ok) {
            //Success
            this.user = <UserModel>res.user;
            let succesMessage = "Update user: " + this.user.name;
            this.openSnackBar(succesMessage, "X", "snackbar-success");

            //Update view hash
            //this.form.get('hash').setValue(this.user.hash);
            this.crud();

          } else {
            //Error
            let errorMessage = "¡Error, " + res.menssage + "!";
            this.openSnackBar(errorMessage, "X", "snackbar-danger");
          }
        });

    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  onDelete() {
    this.action = "DELETE";
    //Api
    this.entityService.remove(UserModel.entity, this.user)
      .subscribe(user => { this.user = <UserModel>user; console.log("Delete user"); console.log(this.user); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete user: " + this.user.name;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('name').invalid) {
      return this.getErrorMessageName();
    }

    if (this.form.get('mail').invalid) {
      return this.getErrorMessageMail();
    }

    if (this.form.get('password').invalid) {
      return this.getErrorMessagePassword();
    }

    if (this.form.get('description').invalid) {
      return this.getErrorMessageDescription();
    }

    if (this.form.get('state').invalid) {
      return this.getErrorMessageState();
    }

    if (this.form.get('role').invalid) {
      return this.getErrorMessageRole();
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

  getErrorMessageMail() {
    if (this.form.get('mail').hasError('required')) {
      return 'Mail is required';
    }
    if (this.form.get('mail').hasError('email')) {
      return 'Invalid email';
    }
  }

  getErrorMessagePassword() {
    if (this.form.get('password').hasError('required')) {
      return 'Password is required';
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

  getErrorMessageRole() {
    if (this.form.get('role').hasError('required')) {
      return 'Role is required';
    }
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(
      message,
      action,
      {
        duration: 3000,
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
