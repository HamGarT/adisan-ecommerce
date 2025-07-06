import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orden, OrdenItem, OrderRequest, Producto } from '../interfaces/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:5459/api/v1/order';
  private orderItemBaseUrl = 'http://localhost:5459/api/v1/order-item';
  constructor(private http : HttpClient) { }

  create(orderRequest: OrderRequest): Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/create`, orderRequest);
  }

  getAllUserOrder(userId: string): Observable<Orden[]>{
    return this.http.get<Orden[]>(`${this.baseUrl}/user/${userId}`);
  }

  getOrderItems(orderId: string): Observable<OrdenItem[]>{
    return this.http.get<OrdenItem[]>(`${this.orderItemBaseUrl}/order/${orderId}`);
  }
}
