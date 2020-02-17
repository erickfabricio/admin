import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { CatalogModel } from 'src/app/entity/models/catalog.model';
import { formatDate } from '@angular/common';
import { ItemMainComponent } from '../../item/item-main/item-main.component';

@Component({
  selector: 'admin-entity-catalog-crud',
  templateUrl: './catalog-crud.component.html',
  styleUrls: ['./catalog-crud.component.css']
})
export class CatalogCrudComponent implements OnInit {

  //CRUD
  action: string;
  catalog: CatalogModel;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

  showItemList: boolean;

  @ViewChild("itemMain", { static: true }) itemMain: ItemMainComponent;

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
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      state: new FormControl('', [Validators.required]),
      creationDate: new FormControl({ value: '', disabled: true })
    });
  }

  show() {
    //Action
    switch (this.action) {
      case "CREATE":
        this.create();
        this.showItemList = false;
        break;
      case "CRUD":
        this.showItemList = true;
        this.crud();
        break;
    }

  }

  //************ FORM ************//

  create() {
    this.title = "New catalog";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.catalog = null;
  }

  crud() {
    this.title = "Catalog";

    this.form.get('id').setValue(this.catalog._id);
    this.form.get('name').setValue(this.catalog.name);
    this.form.get('description').setValue(this.catalog.description);
    this.form.get('state').setValue(this.catalog.state);
    this.form.get('creationDate').setValue(formatDate(this.catalog.creationDate, 'MMM d, y, h:mm:ss a', 'en-US'));
    
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
      this.catalog = new CatalogModel();
      this.catalog.name = String(this.form.get('name').value).trim();
      this.catalog.description = String(this.form.get('description').value).trim();
      this.catalog.state = String(this.form.get('state').value).trim();

      //Api 
      this.entityService.save(CatalogModel.entity, this.catalog)
        .subscribe(catalog => { console.log("New catalog"); this.catalog = <CatalogModel>catalog; this.eventUpdateListEmitter(true) });

      //Succes
      let succesMessage = "New catalog: " + this.catalog._id;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
      //this.createForm();

      //Show CRUD and items
      //this.action = "CRUD";
      //this.showItemList = true;

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
      this.catalog.name = String(this.form.get('name').value).trim();
      this.catalog.description = String(this.form.get('description').value).trim();
      this.catalog.state = String(this.form.get('state').value).trim();

      //Api 
      this.entityService.update(CatalogModel.entity, this.catalog)
        .subscribe(catalog => { console.log("Update catalog"); this.catalog = <CatalogModel>catalog });

      //Succes
      let succesMessage = "Update catalog: " + this.catalog._id;
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
    this.entityService.remove(CatalogModel.entity, this.catalog)
      .subscribe(catalog => { this.catalog = <CatalogModel>catalog; console.log("Delete catalog"); console.log(this.catalog); this.eventUpdateListEmitter(true) });
    //Succes
    let succesMessage = "Delete catalog: " + this.catalog._id;
    this.openSnackBar(succesMessage, "X", "snackbar-success");
  }

  //************ FORM VIDATION ************//

  validateForm() {

    if (this.form.get('name').invalid) {
      return this.getErrorMessageName();
    }

    if (this.form.get('description').invalid) {
      return this.getErrorMessageName();
    }

    if (this.form.get('state').invalid) {
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
