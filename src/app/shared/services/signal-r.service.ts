import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public vehicles: any[] = [];
  private apiUrl : string = environment.hubUrl;
  constructor() {}

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.apiUrl}parkingHub`, {
      withCredentials: true,
    })
    .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) => console.error('SignalR connection error:', err));
  }

  public addVehicleUpdateListener(): void {
    this.hubConnection.on('ReceiveVehiclesParkedOverTwoHours', (data) => {
      console.log('Vehicles parked for more than two hours:', data);
      this.vehicles = data;
    });
  }
}
