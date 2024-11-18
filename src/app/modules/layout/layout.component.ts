import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SignalRService } from '../../shared/services/signal-r.service';

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
  public signalRService: SignalRService;
  constructor(private breakpointObserver: BreakpointObserver, private _signalRService: SignalRService) {
    this.signalRService = _signalRService ?? { vehicles: [] };

  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        this.opened = !this.isSmallScreen;
      });

      this.signalRService.startConnection();
      this.signalRService.addVehicleUpdateListener();
  }

  logout() {
    console.log('Logout triggered');
  }
}
