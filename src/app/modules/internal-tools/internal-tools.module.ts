import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalToolsRoutingModule } from './internal-tools-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ImportWizardProductCreateComponent } from './components/import-wizard-product-create/import-wizard-product-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductListWithoutGenericComponent } from './components/product-list-without-generic/product-list-without-generic.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ImportWizardProductCreateComponent,
    ProductListWithoutGenericComponent
  ],
  imports: [
    CommonModule,
    InternalToolsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class InternalToolsModule { }
