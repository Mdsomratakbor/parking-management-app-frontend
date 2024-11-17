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
  selectedInterval: string = '';
  intervals: string[] = ['Daily', 'Weekly', 'Monthly'];

  constructor(
    public vehicleService:VehicleService) {
        this.loadDashboardData();

    }
  totalCarsParked = 0;
  totalEmptySlots = 0; // Example data
  vehicleTypeInfo:VehicleTypeInfo [] = [];
  vehiclesParkedLong = 0; // Example data for vehicles > 2 hours

  // Chart data
  pieChartData:{name:string, value:number} [] = [];

  lineChartData = [
    {
      name: 'Parking Summary',
      series: [
        { name: 'Day 1', value: 30 },
        { name: 'Day 2', value: 40 },
        { name: 'Day 3', value: 25 },
        { name: 'Day 4', value: 35 },
      ],
    },
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



        // Prepare data for pie chart
        this.pieChartData = data.pieChart.map((type:any) => ({
          name: type.vehicleType,
          value: type.count,
        }));

        this.lineChartData = data.lineChart.map((type: any) => ({
          name: "Parking Summary",
          series: type.timePeriods.map((period: any) => ({
            name: period.timePeriod,
            value: period.count
          }))
        }));
      },
      (error:any) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
