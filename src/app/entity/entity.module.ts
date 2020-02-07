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


@NgModule({
  declarations: [EntityMainComponent, UserMainComponent, UserListComponent, UserCrudComponent, CollectionCrudComponent, CollectionListComponent, CollectionMainComponent, ModuleMainComponent, ModuleListComponent, ModuleCrudComponent, RoleMainComponent, RoleListComponent, RoleCrudComponent],
  imports: [
    CommonModule,
    EntityRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EntityMainComponent, CollectionMainComponent, ModuleMainComponent, RoleMainComponent, UserMainComponent],
  entryComponents: []
})
export class EntityModule { }
