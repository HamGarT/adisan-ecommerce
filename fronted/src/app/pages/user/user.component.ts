import { Component, OnInit } from '@angular/core';
import { Orden, OrdenItem } from '../../interfaces/types';
import { OrderService } from '../../services/order.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { AuthState } from '../../store/reducers/auth.reducer';
import { selectAuthenticatedUserId } from '../../store/selectors/auth.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userOrders: Orden[] | null = null;
  userItemsOrder: OrdenItem[] | null = null;
  selectedOrder: Orden | null = null;


  constructor(
    private orderService: OrderService,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.store.select(selectAuthenticatedUserId).subscribe({
      next: (userId) => {
        console.log(userId)
        if (userId) {
          this.orderService.getAllUserOrder(userId).subscribe({
            next: (orders) => {
              this.userOrders = orders;
            }
          })
        }
      }
    })
  }

  loadOrderItems(order: Orden) {
    this.selectedOrder = order;
    if (order) {
      this.orderService.getOrderItems(order.id || '').subscribe({
        next: (itemOrders) => {
          this.userItemsOrder = itemOrders
          console.log(this.userItemsOrder)
        }
      })
    }
  }
}
