import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeInfo } from '../../models/vehicle-type-info';

@Component({
  selector: 'app-vehicle-parking-dashboard',
  templateUrl: './vehicle-parking-dashboard.component.html',
  styleUrl: './vehicle-parking-dashboard.component.scss'
})
export class VehicleParkingDashboardComponent {
  startDate: Date  = new Date();
  endDate: Date = new Date();
  selectedInterval: string = 'Daily';
  intervals: string[] = ['Daily', 'Weekly', 'Monthly'];

  constructor(
    public vehicleService:VehicleService) {
       this.loadDashboardData();

    }
  totalCarsParked = 0;
  totalEmptySlots = 0;
  vehicleTypeInfo:VehicleTypeInfo [] = [];
  vehiclesParkedLong = 0;

  pieChartData:{name:string, value:number} [] = [];

  lineChartData:    {
    name: string,
    series: [{ name: string, value: number }]}[] = [

  ];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  onDateChange(type: string, event: any): void {
    if (type === 'start') this.startDate = event.value;
    if (type === 'end') this.endDate = event.value;
  }

  onIntervalChange(event: any): void {
    this.selectedInterval = event.value;
  }

  applyFilter(): void {
   this.loadDashboardData();
  }
  loadDashboardData(): void {
    this.vehicleService.getDashboardData(this.startDate.toISOString(), this.endDate?.toISOString(), this.selectedInterval).subscribe(
      (data) => {
        this.totalCarsParked = data.totalCarsParked;
        this.totalEmptySlots = data.totalEmptySlots;
        this.vehicleTypeInfo = data.vehicleTypeInfo;
        this.vehiclesParkedLong = data.vehiclesParkedMoreThanTwoHours;




        this.pieChartData = data.pieChart.map((type:any) => ({
          name: type.vehicleType,
          value: type.count,
        }));

        this.lineChartData = [
          {
            name: "Parking Summary",
            series: Array.isArray(data?.lineChart)
              ? data.lineChart.map((period: any) => ({
                  name: period?.timePeriod || "Unknown Period",
                  value: period?.count ?? 0
                }))
              : []
          }
        ];

      },
      (error:any) => {
        console.log('Error fetching dashboard data', error);
      }
    );
  }
}
