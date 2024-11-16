import { Component, ViewChild } from '@angular/core';
import { VehicleParkingComponent } from '../vehicle-parking/vehicle-parking.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleList } from '../../models/vehicle.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-parking-data',
  templateUrl: './vehicle-parking-data.component.html',
  styleUrl: './vehicle-parking-data.component.scss'
})
export class VehicleParkingDataComponent {

  dataSource = new MatTableDataSource<VehicleList>();
  pageSize: number = 5;
  totalCount: number = 0;
  currentPage: number = 1;
  loading: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'ownerName',
    'vehicleType',
    'licenseNumber',
    'entryTime',
    'exitTime',
    'status',
    'actions'
  ];

  constructor(private vehicleService: VehicleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }





  onAddVehicle(id:number) {

        const dialogRef = this.dialog.open(VehicleParkingComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '80%',
          width: '80%',
          panelClass: 'full-screen-modal',
          disableClose:true,
          data: { id: id }
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result.data) {
            window.location.reload()
          } else {
            console.log("not export", result);
          }
        });
      }

  onPaginateChange(event: any) {
    console.log(`Page Index: ${event.pageIndex}, Page Size: ${event.pageSize}`);
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadData();
  }

  updatePaginatedDataSource() {

      this.paginator.length = this.totalCount;
      this.paginator.pageIndex = this.currentPage - 1;

  }

  loadData() {
    this.loading = true;

    this.vehicleService.getVehicles(this.currentPage, this.pageSize)
      .subscribe(
        response => {
          console.log(response);
          this.dataSource.data = response.vehicles;
          this.totalCount = response.totalRecords;
          this.updatePaginatedDataSource();
          this.loading = false;
        },
        error => {
          console.error('Error loading vehicles:', error);
          this.loading = false;
        }
      );
  }

  }
