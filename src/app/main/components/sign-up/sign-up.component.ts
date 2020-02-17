import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';

@Component({
  selector: 'admin-main-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  //Form  
  form: FormGroup;
  user: UserModel;
  hide: boolean = true;

  constructor(private entityService: EntityService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  //************ ACTIONS OF FORM ************//

  signUp() {
    if (this.form.valid) {
      //Assignment of values
      this.user = new UserModel();
      this.user.name = String(this.form.get('name').value).trim();
      this.user.mail = String(this.form.get('mail').value).trim();
      this.user.password = String(this.form.get('password').value).trim();

      //Api 
      //this.entityService.save(UserModel.entity, this.user).subscribe(user => { console.log("New user"); this.user = <UserModel>user; });

      //Succes
      let succesMessage = "New user: " + this.user.name;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
      //this.createForm();
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
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

    if (this.form.get('confirmPassword').invalid) {
      return this.getErrorMessageConfirmPassword();
    }

  }

  getErrorMessageName() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
    if (this.form.get('name').hasError('minlength')) {
      return 'Minimum length is 5 characters';
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

  getErrorMessageConfirmPassword() {
    if (this.form.get('confirmPassword').hasError('required')) {
      return 'Confirm password is required';
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
