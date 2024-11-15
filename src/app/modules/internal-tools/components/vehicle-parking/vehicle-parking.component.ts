import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-parking',
  templateUrl: './vehicle-parking.component.html',
  styleUrl: './vehicle-parking.component.scss'
})
export class VehicleParkingComponent {
  parkingForm!: FormGroup;

  // Dropdown data for vehicle types
  vehicleTypes: string[] = ['MicroBus', 'Car', 'Truck', 'Bike'];
  parkingCharges:{ [key: string]: number } = {
    "Car": 10,
    "Truck": 20,
    "MicroBus": 5,
    "Bike":10
  };
  constructor(private fb: FormBuilder,
    public vehicleService:VehicleService,
    public dialogRef: MatDialogRef<VehicleParkingComponent>,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.parkingForm = this.fb.group({
      licenseNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9-]{6,12}$/), // Alphanumeric with hyphens
        ],
      ],
      vehicleType: ['', Validators.required],
      ownerName: ['', [Validators.required, Validators.minLength(3)]],
      ownerPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/), // International or local format
        ],
      ],
      ownerAddress: ['', [Validators.required, Validators.maxLength(200)]],
      status: ['in', Validators.required],

      // Entry Date and Time (Required)
      entryDate: ['', Validators.required],
      entryTime: ['', Validators.required],

      // Exit Date and Time (Required)
      exitDate: [''],
      exitTime: [''],

      parkingCharge: [0, [Validators.required, Validators.min(0)]],
    }, { validators: this.dateTimeValidator });


    this.parkingForm.get('vehicleType')?.valueChanges.subscribe((value) => {
      this.updateParkingCharge(value);
    });
  }
  dateTimeValidator(control: AbstractControl): ValidationErrors | null {
    const entryDate = control.get('entryDate');
    const entryTime = control.get('entryTime');
    const exitDate = control.get('exitDate');
    const exitTime = control.get('exitTime');

    // Entry Time is required if Entry Date is provided
    if (entryDate?.value && !entryTime?.value) {
      return { entryTimeRequired: true };
    }

    // Exit Time is required if Exit Date is provided
    if (exitDate?.value && !exitTime?.value) {
      return { exitTimeRequired: true };
    }

    return null;
  }

  updateParkingCharge(vehicleType: string) {
    if (vehicleType && this.parkingCharges[vehicleType]) {
      this.parkingForm.get('parkingCharge')?.setValue(this.parkingCharges[vehicleType]);
    } else {
      this.parkingForm.get('parkingCharge')?.setValue(0);
    }
  }


  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.parkingForm.valid) {
      // Manually bind form data to the vehicle object
      const formData = {
        licenseNumber: this.parkingForm.value.licenseNumber,
        vehicleType: this.parkingForm.value.vehicleType,
        ownerName: this.parkingForm.value.ownerName,
        ownerPhone: this.parkingForm.value.ownerPhone,
        ownerAddress: this.parkingForm.value.ownerAddress,
        status: this.parkingForm.value.status,
        parkingCharge: this.parkingForm.value.parkingCharge,
        // Merge entry date and time
        entryTime: this.mergeDateTime(this.parkingForm.value.entryDate, this.parkingForm.value.entryTime),
      };

      // Call the createVehicle API
      this.vehicleService.createVehicle(formData).subscribe(
        (response) => {
          console.log('Vehicle created successfully:', response);

          // Display success message
          alert('Vehicle registered successfully!');

          // Save to local storage (optional backup)
          const storedData = JSON.parse(localStorage.getItem('parkingData') || '[]');
          storedData.push(formData);
          localStorage.setItem('parkingData', JSON.stringify(storedData));

          // Reset the form with default values
          this.parkingForm.reset({ status: 'in', parkingCharge: 0 });
        },
        (error: any) => {
          console.error('Error creating vehicle:', error);

          // Display error message
          alert('Failed to register the vehicle. Please try again.');
        }
      );
    }
  }

  // Helper method to merge date and time
  mergeDateTime(date: string, time: string): string {
    // Ensure date is in YYYY-MM-DD format and time is in HH:mm format
    const formattedDate = new Date(date);
    const formattedTime = time.split(':');

    // Check if time is correctly split and in the right format
    if (formattedTime.length === 2) {
      const hours = formattedTime[0].padStart(2, '0');
      const minutes = formattedTime[1].padStart(2, '0');

      // Create a new Date object combining the date and time
      formattedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set the correct hours and minutes
    } else {
      // Handle invalid time format, you can set a default time or return an error
      console.error('Invalid time format');
      return '';
    }

    return formattedDate.toISOString(); // Return the combined date-time in ISO format
  }



}
