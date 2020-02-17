import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material.module';
import { EntityModule } from '../entity/entity.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './components/profile/profile.component';
import { HelpComponent } from './components/help/help.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [DashboardComponent, SignUpComponent, LoginComponent, ProfileComponent, HelpComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MainRoutingModule,        
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EntityModule,
    FlexLayoutModule
  ], 
  exports: [
    LoginComponent, DashboardComponent
  ]
})
export class MainModule { }
