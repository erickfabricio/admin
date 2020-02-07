import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntityMainComponent } from './components/main/main.component';


const routes: Routes = [
  { path: '', component: EntityMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
