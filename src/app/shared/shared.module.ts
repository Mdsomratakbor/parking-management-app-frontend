import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material.module';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GenericListComponent,
  ],
  exports:[
    MaterialModule,
    GenericListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule

  ]
})
export class SharedModule { }
