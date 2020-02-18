import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntityService } from 'src/app/entity/services/entity.service';
import { ItemModel } from 'src/app/entity/models/item.model';
import { CatalogModel } from 'src/app/entity/models/catalog.model';

@Component({
  selector: 'admin-entity-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  //Filter
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<ItemModel>;

  //List
  items: ItemModel[];

  //catalog: CatalogModel;
  @Input('catalog') catalog: CatalogModel;
    
  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.displayedColumns = ['#', 'id', 'name', 'state'];
    this.dataSource = new MatTableDataSource<ItemModel>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.find();
  }

  find() {
    this.items = this.catalog.list;
    this.dataSource.data = this.items;
  }

  /*
  ngOnChanges(){
    console.log("List");
    console.log(this.catalog);
    if(this.catalog != null && this.catalog.list.length > 0){      
      this.dataSource.data = this.catalog.list;
    }
  }*/

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //************ EVENTS ************//
  @Output() eventCrud = new EventEmitter<any>();
  eventCrudEmitter(action: string, item: ItemModel) {    
    return this.eventCrud.emit({action, item, catalog: this.catalog});
  }

}
