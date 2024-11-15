import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../../shared/models/response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl : string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<ResponseMessage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseMessage>(`${this.apiUrl}product/create`, product, { headers });
  }

  // getProducts(title?: string, brand?: string, pageNumber: number = 1, pageSize: number = 10): Observable<any> {
  //   const params = { title, brand, pageNumber: pageNumber.toString(), pageSize: pageSize.toString() };
  //   return this.http.get<any>(`${this.apiUrl}/api/product/list`, {  params:  params }); // Adjust the API endpoint
  // }

  getProducts(
    title: string, brand: string, pageNumber: number = 1, pageSize: number = 10
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}product/list`, {
      params: {
        title: title,
        brand: brand,
        pageNumber: pageNumber,
        pageSize: pageSize
      },
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    });
  }

}
