import { Component } from '@angular/core';
import { SignalRService } from './shared/services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parking-management-system-app';

  constructor() {}

  ngOnInit(): void {

  }
}
