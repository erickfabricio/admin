import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

//Angulas Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module';

import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,        
    
    MaterialModule, 
    
    ModalModule.forRoot(),
    AlertModule.forRoot(),

    FlexLayoutModule,

    MainModule
    
  ],

  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
