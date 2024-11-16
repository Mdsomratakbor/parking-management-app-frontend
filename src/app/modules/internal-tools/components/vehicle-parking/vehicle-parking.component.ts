import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-parking',
  templateUrl: './vehicle-parking.component.html',
  styleUrl: './vehicle-parking.component.scss'
})
export class VehicleParkingComponent {
  parkingForm!: FormGroup;

  vehicleId:number = 0;
  vehicleTypes: string[] = ['MicroBus', 'Car', 'Truck', 'Bike'];
  loading:boolean = true;
  parkingCharges:{ [key: string]: number } = {
    "Car": 10,
    "Truck": 20,
    "MicroBus": 5,
    "Bike":10
  };
  constructor(private fb: FormBuilder,
    public vehicleService:VehicleService,
    public dialogRef: MatDialogRef<VehicleParkingComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.vehicleId = data.id;
      if(this.vehicleId>0)
      {
          this.getVehicleById();

      }
      else{
        this.loading= false;
      }

    }

  ngOnInit(): void {
    this.parkingForm = this.fb.group({
      licenseNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9-]{6,12}$/),
        ],
      ],
      vehicleType: ['', Validators.required],
      ownerName: ['', [Validators.required, Validators.minLength(3)]],
      ownerPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/),
        ],
      ],
      ownerAddress: ['', [Validators.required, Validators.maxLength(200)]],
      status: ['', Validators.required],


      entryDate: [{ value: '', disabled: true }, Validators.required],
      entryTime: [{ value: '', disabled: true }, Validators.required],


      exitDate: [{ value: '', disabled: true }],
      exitTime: [{ value: '', disabled: true }],

      parkingCharge: [0, [Validators.required, Validators.min(0)]],
    }, { validators: this.dateTimeValidator });


    this.parkingForm.get('vehicleType')?.valueChanges.subscribe((value) => {
      this.updateParkingCharge(value);
    });

    this.parkingForm.get('status')?.valueChanges.subscribe((status) => {
      if (status === 'in') {
        this.enableEntryFields();
        this.disableExitFields();
      } else if (status === 'out') {
        this.enableExitFields();
        this.disableEntryFields();
      }
    });
  }




  private enableEntryFields(): void {
    this.parkingForm.get('entryDate')?.enable();
    this.parkingForm.get('entryTime')?.enable();
  }

  private disableEntryFields(): void {
    this.parkingForm.get('entryDate')?.disable();
    this.parkingForm.get('entryTime')?.disable();
    if(this.vehicleId === 0 ){
    this.parkingForm.get('entryDate')?.reset();
    this.parkingForm.get('entryTime')?.reset();
    }
  }

  private enableExitFields(): void {
    this.parkingForm.get('exitDate')?.enable();
    this.parkingForm.get('exitTime')?.enable();
  }

  private disableExitFields(): void {
    this.parkingForm.get('exitDate')?.disable();
    this.parkingForm.get('exitTime')?.disable();
    this.parkingForm.get('exitDate')?.reset();
    this.parkingForm.get('exitTime')?.reset();
  }


  dateTimeValidator(control: AbstractControl): ValidationErrors | null {
    const entryDate = control.get('entryDate');
    const entryTime = control.get('entryTime');
    const exitDate = control.get('exitDate');
    const exitTime = control.get('exitTime');

    if (entryDate?.value && !entryTime?.value) {
      return { entryTimeRequired: true };
    }

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

  getVehicleById() {
    this.loading = true;
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      (response: any) => {
        if (response) {
          let entryDateTime = this.extractDateTime(response.entryTime);
          let exitDateTime = this.extractDateTime(response.exitTime);
          this.parkingForm.patchValue({
            licenseNumber: response.licenseNumber,
            vehicleType: response.vehicleType,
            ownerName: response.ownerName,
            ownerPhone: response.ownerPhone,
            ownerAddress: response.ownerAddress,
            status: response.status,
            entryDate: entryDateTime?.date,
            entryTime: entryDateTime?.time,
            exitDate: exitDateTime?.date,
            exitTime: exitDateTime?.time,
            parkingCharge: response.parkingCharge || ''
          });
          const status = response.status;

          if (status === 'in') {
            this.enableEntryFields();
            this.disableExitFields();
          } else if (status === 'out') {
            this.enableExitFields();
            this.disableEntryFields();
          }
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching vehicle data:', error);
        this.loading = false;
      }
    );
  }











  onSubmit(): void {
    if (this.parkingForm.valid) {
      const formData = this.prepareFormData();

      if (formData.entryTime && formData.exitTime) {
        const entryDateTime = new Date(formData.entryTime);
        const exitDateTime = new Date(formData.exitTime);

        if (entryDateTime >= exitDateTime) {
          alert('Exit time must be later than entry time.');
          return;
        }
      }

      if (this.vehicleId>0) {
        this.updateVehicle(formData);
      } else {
        this.createVehicle(formData);
      }
    }
  }

  private prepareFormData(): any {
    const rawValue = this.parkingForm.getRawValue();
    return {
      vehicleId: this.vehicleId,
      licenseNumber: rawValue.licenseNumber,
      vehicleType: rawValue.vehicleType,
      ownerName: rawValue.ownerName,
      ownerPhone: rawValue.ownerPhone,
      ownerAddress: rawValue.ownerAddress,
      status: rawValue.status,
      parkingCharge: rawValue.parkingCharge,
      entryTime: this.mergeDateTime(rawValue.entryDate, rawValue.entryTime),
      exitTime: this.mergeDateTime(rawValue.exitDate, rawValue.exitTime),
    };
  }


  private createVehicle(formData: any): void {
    this.vehicleService.createVehicle(formData).subscribe(
      (response) => {
        console.log('Vehicle created successfully:', response);
        this.handleSuccess('Vehicle registered successfully!', formData);
      },
      (error) => {
        console.error('Error creating vehicle:', error);
        this.handleError('Failed to register the vehicle. Please try again.');
      }
    );
  }

  private updateVehicle(formData: any): void {
    this.vehicleService.updateVehicle(formData).subscribe(
      (response) => {
        console.log('Vehicle updated successfully:', response);
        this.handleSuccess('Vehicle updated successfully!');
      },
      (error) => {
        console.error('Error updating vehicle:', error);
        this.handleError('Failed to update the vehicle. Please try again.');
      }
    );
  }

  private handleSuccess(message: string, formData?: any): void {
    alert(message);

    if (formData) {
      const storedData = JSON.parse(localStorage.getItem('parkingData') || '[]');
      storedData.push(formData);
      localStorage.setItem('parkingData', JSON.stringify(storedData));
    }

    this.resetForm();
    this.onClose();
  }

  private handleError(message: string): void {
    alert(message);
  }


  private resetForm(): void {
    this.parkingForm.reset({ status: 'in', parkingCharge: 0 });
  }



  mergeDateTime(date: string, time: string): string | null {
    if (!date || !time) {
      return null;
    }

    const formattedDate = new Date(date);
    const timeParts = time.split(' ');

    if (timeParts.length === 2) {
      const timeWithoutSuffix = timeParts[0];
      const suffix = timeParts[1].toUpperCase();

      const [hours, minutes] = timeWithoutSuffix.split(':');

      let hour = parseInt(hours);
      if (suffix === 'PM' && hour < 12) {
        hour += 12;
      } else if (suffix === 'AM' && hour === 12) {
        hour = 0;
      }

      const localDate = new Date(
        formattedDate.getFullYear(),
        formattedDate.getMonth(),
        formattedDate.getDate(),
        hour,
        parseInt(minutes)
      );

      // Format manually to keep local time
      const localIsoString = `${localDate.getFullYear()}-${String(
        localDate.getMonth() + 1
      ).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}T${String(
        localDate.getHours()
      ).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}:${String(
        localDate.getSeconds()
      ).padStart(2, '0')}.${String(localDate.getMilliseconds()).padStart(3, '0')}`;

      return localIsoString;
    } else {
      console.error('Invalid time format');
      return null;
    }
  }



  extractDateTime(dateString: string | null | undefined): { date: string | null, time: string | null } | null {
    if (!dateString) {
      return null;
    }

    const date = new Date(dateString);

    const formattedDate = date.toISOString().split('T')[0];

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${amPm}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }


}
