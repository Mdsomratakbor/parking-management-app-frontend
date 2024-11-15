import { Component } from '@angular/core';
import { VehicleParkingComponent } from '../vehicle-parking/vehicle-parking.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-parking-data',
  templateUrl: './vehicle-parking-data.component.html',
  styleUrl: './vehicle-parking-data.component.scss'
})
export class VehicleParkingDataComponent {
  displayedColumns: string[] = [
    'ownerName',
    'vehicleType',
    'licenseNumber',
    'entryTime',
    'exitTime',
    'status',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private vehicleService: VehicleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Load Vehicles from Service
  loadVehicles(): void {
    //const vehicles = this.vehicleService.getVehicles();
    //this.dataSource.data = vehicles;
  }



  onAddVehicle() {

        const dialogRef = this.dialog.open(VehicleParkingComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '80%',
          width: '80%',
          panelClass: 'full-screen-modal',
          disableClose:true
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result.data) {
            window.location.reload()
          } else {
            console.log("not export", result);
          }
        });
      }
  // Edit Existing Vehicle
  onEditVehicle(vehicle: any): void {
    console.log('Edit Vehicle:', vehicle);
    // Logic for opening a dialog or navigating to form
  }
  }
