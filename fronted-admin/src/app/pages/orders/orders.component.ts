import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../../interfaces';
import { OrderService } from '../../services/order.service';
import { OrderStatusFormComponent } from "../../components/order-status-form/order-status-form.component";
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [OrderStatusFormComponent, NgIf, NgClass, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] | null = null;
  orderItems: OrderItem[] | null = null;
  orderSelected: Order | null = null;
  showForm = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
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

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onOrderUpdated() {
    this.loadOrders(); 
    this.toggleForm(); 
  }

  onEditOrderStatus(order: Order){
    this.orderSelected = order;
    this.toggleForm()
  }
}


