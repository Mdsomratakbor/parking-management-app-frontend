import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalToolsRoutingModule } from './internal-tools-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { VehicleParkingComponent } from './components/vehicle-parking/vehicle-parking.component';
import { VehicleParkingDataComponent } from './components/vehicle-parking-data/vehicle-parking-data.component';


@NgModule({
  declarations: [
    VehicleParkingComponent,
    VehicleParkingDataComponent
  ],
  imports: [
    CommonModule,
    InternalToolsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class InternalToolsModule { }
