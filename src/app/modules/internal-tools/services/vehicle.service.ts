import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../../shared/models/response';
import { environment } from '../../../../environments/environment';
import { Vehicle, VehicleList } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  private apiUrl : string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  createVehicle(vehicle: Vehicle): Observable<ResponseMessage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseMessage>(`${this.apiUrl}vehicle`, vehicle, { headers });
  }

  updateVehicle(vehicle: VehicleList): Observable<ResponseMessage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ResponseMessage>(`${this.apiUrl}vehicle/${vehicle.vehicleId}`, vehicle, { headers });
  }

  getVehicles(
    pageNumber: number = 1, pageSize: number = 10
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}vehicle`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      },
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    });
  }

  getVehicle(
    id:number
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}vehicle/${id}`, {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    });
  }
  getDashboardData(
    date:string,
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}vehicle/dashboard`, {
      params:{
         date : date
      },
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    });
  }
}
