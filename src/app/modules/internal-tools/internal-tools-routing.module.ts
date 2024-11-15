import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListWithoutGenericComponent } from './components/product-list-without-generic/product-list-without-generic.component';

const routes: Routes = [
  {
    path:'products',
    component: ProductListComponent
  },
  {
    path:'product-without-generic',
    component: ProductListWithoutGenericComponent
  },
  {
    path:'',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalToolsRoutingModule { }
