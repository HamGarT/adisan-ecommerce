import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   private baseUrl = 'http://localhost:5459/api/v1/order';
    private orderItemBaseUrl = 'http://localhost:5459/api/v1/order-item';

  constructor(private http : HttpClient) { }

  getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}/list-all`);
  }

  getOrderItems(orderId: string): Observable<OrderItem[]>{
    return this.http.get<OrderItem[]>(`${this.orderItemBaseUrl}/order/${orderId}`);
  }
}
