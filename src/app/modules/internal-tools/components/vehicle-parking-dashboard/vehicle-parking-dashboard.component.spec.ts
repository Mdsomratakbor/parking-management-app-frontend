import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleParkingDashboardComponent } from './vehicle-parking-dashboard.component';

describe('VehicleParkingDashboardComponent', () => {
  let component: VehicleParkingDashboardComponent;
  let fixture: ComponentFixture<VehicleParkingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleParkingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleParkingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
