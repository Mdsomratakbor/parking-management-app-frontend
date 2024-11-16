
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleParkingDataComponent } from './components/vehicle-parking-data/vehicle-parking-data.component';
import { VehicleParkingDashboardComponent } from './components/vehicle-parking-dashboard/vehicle-parking-dashboard.component';

const routes: Routes = [
  {
    path:'parking',
    component: VehicleParkingDataComponent
  },
  {
    path:'dashboard',
    component: VehicleParkingDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalToolsRoutingModule { }
