import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ItemModel } from 'src/app/entity/models/item.model';
import { formatDate } from '@angular/common';
import { CatalogModel } from 'src/app/entity/models/catalog.model';

@Component({
  selector: 'admin-entity-item-crud',
  templateUrl: './item-crud.component.html',
  styleUrls: ['./item-crud.component.css']
})
export class ItemCrudComponent implements OnInit {

  //CRUD
  action: string;

  //Form
  title: string;
  form: FormGroup;
  visibleControls;

  hide: boolean = true;

  catalog: CatalogModel;
  item: ItemModel;

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
    //console.log("ItemCrud-show");
    //console.log(this.item);
    //console.log(this.catalog);

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
    this.title = "New item";
    this.visibleControls.id = false;
    this.visibleControls.creationDate = false;
    this.form.reset();
    this.item = null;
  }

  crud() {
    this.title = "Item";

    this.form.get('id').setValue(this.item._id);
    this.form.get('name').setValue(this.item.name);
    this.form.get('description').setValue(this.item.description);
    this.form.get('state').setValue(this.item.state);
    this.form.get('creationDate').setValue(formatDate(this.item.creationDate, 'MMM d, y, h:mm:ss a', 'en-US'));

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
      this.item = new ItemModel();
      this.item.name = String(this.form.get('name').value).trim();
      this.item.description = String(this.form.get('description').value).trim();
      this.item.state = String(this.form.get('state').value).trim();

      //Api - Update
      this.catalog.list.push(this.item);
      this.entityService.update(CatalogModel.entity, this.catalog)
        .subscribe(catalog => {
          //console.log("Create item - Update list");
          //console.log(this.catalog);
          this.catalog = <CatalogModel>catalog;
          this.eventUpdateListEmitter(true);
        });

      //Succes
      let succesMessage = "New item: " + this.item.name;
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

      let index = this.catalog.list.indexOf(this.item);
      //console.log(index);

      //Assignment of values
      this.item.name = String(this.form.get('name').value).trim();
      this.item.description = String(this.form.get('description').value).trim();
      this.item.state = String(this.form.get('state').value).trim();

      //Api - Update
      this.catalog.list[index] = this.item;
      this.entityService.update(CatalogModel.entity, this.catalog)
        .subscribe(catalog => {
          //console.log("Update list");
          //console.log(this.catalog);
          //console.log(this.item);
          this.catalog = <CatalogModel>catalog;
          this.item = this.catalog.list[index];
          this.eventUpdateListEmitter(true);
        });

      //Succes
      let succesMessage = "Update item: " + this.item._id;
      this.openSnackBar(succesMessage, "X", "snackbar-success");
    } else {
      //Error
      let errorMessage = "¡Invalid form, " + this.validateForm() + "!";
      this.openSnackBar(errorMessage, "X", "snackbar-danger");
    }

  }

  onDelete() {
    this.action = "DELETE";

    //Api - Update
    this.catalog.list = this.catalog.list.filter(item => item._id !== this.item._id);
    this.entityService.update(CatalogModel.entity, this.catalog)
      .subscribe(catalog => {
        //console.log("Delete item - Update list");
        //console.log(this.catalog);
        this.catalog = <CatalogModel>catalog;
        this.eventUpdateListEmitter(true);
      });

    //Succes
    let succesMessage = "Delete item: " + this.item._id;
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
  @Output() eventUpdateList = new EventEmitter<any>();
  eventUpdateListEmitter(isUpdate: boolean) {
    if (isUpdate) {
      var data = { isUpdate: isUpdate, catalog: this.catalog };
      this.eventUpdateList.emit(data);
    }
  }


}
