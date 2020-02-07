import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { UserModel } from 'src/app/entity/models/user.model';
import { SessionService } from '../../services/session.service';
import { MainRoutingModule } from '../../main-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'mail-main-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Form  
  form: FormGroup;
  user: UserModel;
  hide: boolean = true;

  constructor(private router: Router, private sessionService: SessionService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  //************ ACTIONS OF FORM ************//

  login() {
    if (this.form.valid) {
      //Assignment of values
      this.user = new UserModel();
      this.user.mail = String(this.form.get('mail').value).trim();
      this.user.password = String(this.form.get('password').value).trim();

      //Api      
      this.sessionService.login(this.user).subscribe(resp => {
        console.log(resp);

        if (resp.ok) {
          let succesMessage = resp.menssage + " token: " + resp.token;
          this.openSnackBar(succesMessage, "X", "snackbar-success");

          localStorage.setItem("token", resp.token);

          //Dashboard
          this.router.navigate(['dashboard']);

        } else {
          let succesMessage = resp.menssage;
          this.openSnackBar(succesMessage, "X", "snackbar-danger");
        }

      });

    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('mail').invalid) {
      return this.getErrorMessageMail();
    }

    if (this.form.get('password').invalid) {
      return this.getErrorMessagePassword();
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
