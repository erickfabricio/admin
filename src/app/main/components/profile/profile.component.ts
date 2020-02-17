import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserCrudComponent } from 'src/app/entity/components/user/user-crud/user-crud.component';
import { UserModel } from 'src/app/entity/models/user.model';
import { RoleModel } from 'src/app/entity/models/role.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntityService } from 'src/app/entity/services/entity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrivilegeCollectionModel } from 'src/app/entity/models/privilege.collection.model';

@Component({
  selector: 'admin-main-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

  @Input('userSession') userSession: UserModel;
  @Input('roleSession') roleSession: RoleModel;
  
  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.title = "User: " + this.userSession.name;
    
    this.visibleControls = {
      id: true,
      name: true,
      mail: true,
      password: true,
      description: true,
      creationDate: true,
      state: true,
      role: true
    }
    
    this.createForm();
    this.load();

  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      creationDate: new FormControl({ value: '', disabled: true }),
      state: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  //************ FORM ************//

  load() {
    this.title = "User";

    this.form.get('id').setValue(this.userSession._id);
    this.form.get('name').setValue(this.userSession.name);
    this.form.get('mail').setValue(this.userSession.mail);
    this.form.get('password').setValue(this.userSession.password);
    this.form.get('description').setValue(this.userSession.description);
    this.form.get('creationDate').setValue(this.userSession.creationDate);
    this.form.get('state').setValue(this.userSession.state);

    this.form.get('role').setValue(this.roleSession.name);

    this.visibleControls = {
      id: true,
      name: true,
      mail: true,
      password: true,
      description: true,
      creationDate: true,
      state: true,
      role: true
    }
  }

  //************ ACTIONS OF FORM ************//

  onUpdate() {
    //Check if there were changes    
    if (this.form.valid) {
      //Assignment of values
      this.userSession.name = String(this.form.get('name').value).trim();
      this.userSession.mail = String(this.form.get('mail').value).trim();
      this.userSession.password = String(this.form.get('password').value).trim();
      this.userSession.description = String(this.form.get('description').value).trim();
      this.userSession.state = String(this.form.get('state').value).trim();

      console.log(String(this.form.get('role').value).trim());
      this.userSession.role = String(this.form.get('role').value).trim();

      //Api 
      this.entityService.update(UserModel.entity, this.userSession)
        .subscribe(userSession => { console.log("Update userSession"); this.userSession = <UserModel>userSession });

      //Succes
      let succesMessage = "Update userSession: " + this.userSession.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }


  //************ FORM VIDATION ************//

  validateForm() {
    if (this.form.get('password').invalid) {
      return this.getErrorMessagePassword();
    }
  }

  getErrorMessagePassword() {
    if (this.form.get('password').hasError('required')) {
      return 'Password is required';
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

}
