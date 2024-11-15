import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleParkingDataComponent } from './vehicle-parking-data.component';

describe('VehicleParkingDataComponent', () => {
  let component: VehicleParkingDataComponent;
  let fixture: ComponentFixture<VehicleParkingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleParkingDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleParkingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
