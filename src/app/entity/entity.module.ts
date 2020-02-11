import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntityMainComponent } from './components/main/main.component';

import { CollectionMainComponent } from './components/collection/collection-main/collection-main.component';
import { CollectionListComponent } from './components/collection/collection-list/collection-list.component';
import { CollectionCrudComponent } from './components/collection/collection-crud/collection-crud.component';

import { ModuleMainComponent } from './components/module/module-main/module-main.component';
import { ModuleListComponent } from './components/module/module-list/module-list.component';
import { ModuleCrudComponent } from './components/module/module-crud/module-crud.component';

import { UserMainComponent } from './components/user/user-main/user-main.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCrudComponent } from './components/user/user-crud/user-crud.component';

import { RoleMainComponent } from './components/role/role-main/role-main.component';
import { RoleListComponent } from './components/role/role-list/role-list.component';
import { RoleCrudComponent } from './components/role/role-crud/role-crud.component';
import { AppCrudComponent } from './components/app/app-crud/app-crud.component';
import { AppListComponent } from './components/app/app-list/app-list.component';
import { AppMainComponent } from './components/app/app-main/app-main.component';
import { TokenCrudComponent } from './components/token/token-crud/token-crud.component';
import { TokenListComponent } from './components/token/token-list/token-list.component';
import { TokenMainComponent } from './components/token/token-main/token-main.component';
import { LogCrudComponent } from './components/log/log-crud/log-crud.component';
import { LogListComponent } from './components/log/log-list/log-list.component';
import { LogMainComponent } from './components/log/log-main/log-main.component';
import { DataCrudComponent } from './components/data/data-crud/data-crud.component';
import { DataListComponent } from './components/data/data-list/data-list.component';
import { DataMainComponent } from './components/data/data-main/data-main.component';


@NgModule({
  declarations: [EntityMainComponent, UserMainComponent, UserListComponent, UserCrudComponent, CollectionCrudComponent, CollectionListComponent, CollectionMainComponent, ModuleMainComponent, ModuleListComponent, ModuleCrudComponent, RoleMainComponent, RoleListComponent, RoleCrudComponent, AppCrudComponent, AppListComponent, AppMainComponent, TokenCrudComponent, TokenListComponent, TokenMainComponent, LogCrudComponent, LogListComponent, LogMainComponent, DataCrudComponent, DataListComponent, DataMainComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EntityMainComponent, CollectionMainComponent, ModuleMainComponent, RoleMainComponent, UserMainComponent, AppMainComponent, TokenMainComponent, LogMainComponent, DataMainComponent],
  entryComponents: []
})
export class EntityModule { }
