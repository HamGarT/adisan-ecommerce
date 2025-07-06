import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../../interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] | null = null;
  orderItems: OrderItem[] | null = null;
  orderSelected: Order | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      }
    })
  }

  loadOrderItems(order: Order) {
    if (order != null) {
      this.orderSelected = order;
      this.orderService.getOrderItems(order.id || '').subscribe({
        next: (itemOrders) => {
          this.orderItems = itemOrders
          console.log(this.orderItems)
        }
      })
    }

  }
}


