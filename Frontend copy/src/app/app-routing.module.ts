import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';

const routes: Routes = [
  { path: '', component: ListProductComponent },
  { path: 'add', component: AddEditProductComponent} ,
  { path:'add/:id', component: AddEditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
