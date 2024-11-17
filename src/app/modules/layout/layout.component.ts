import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isSmallScreen: boolean = false;
  opened: boolean = true;
  vehicleToNotify: any = null;
  notificationMessage:string =""
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        this.opened = !this.isSmallScreen;
      });
  }
  checkForParkedVehicles() {

  }
  sendPushNotification(){

  }
  logout() {
    console.log('Logout triggered');
  }
}
