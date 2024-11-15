import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleParkingDataComponent } from './components/vehicle-parking-data/vehicle-parking-data.component';

const routes: Routes = [
  {
    path:'vehicle-parking',
    component: VehicleParkingDataComponent
  },
  // {
  //   path:'product-without-generic',
  //   component: ProductListWithoutGenericComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalToolsRoutingModule { }
