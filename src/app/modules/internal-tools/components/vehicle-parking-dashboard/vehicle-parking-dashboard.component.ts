import { Component } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeInfo } from '../../models/vehicle-type-info';

@Component({
  selector: 'app-vehicle-parking-dashboard',
  templateUrl: './vehicle-parking-dashboard.component.html',
  styleUrl: './vehicle-parking-dashboard.component.scss'
})
export class VehicleParkingDashboardComponent {
  selectedDate: Date = new Date();

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

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.loadDashboardData();
  }
  loadDashboardData(): void {
    this.vehicleService.getDashboardData(this.selectedDate.toISOString()).subscribe(
      (data) => {
        this.totalCarsParked = data.totalCarsParked;
        this.totalEmptySlots = data.totalEmptySlots;
        this.vehicleTypeInfo = data.vehicleTypeInfo;
        this.vehiclesParkedLong = data.vehiclesParkedMoreThanTwoHours;



        // Prepare data for pie chart
        this.pieChartData = this.vehicleTypeInfo.map((type) => ({
          name: type.vehicleType,
          value: type.count,
        }));

        // Example line chart data; replace with dynamic data if available
        this.lineChartData = [
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
      },
      (error:any) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
