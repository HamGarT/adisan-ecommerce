import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { NgIf } from '@angular/common';
import { Order } from '../../interfaces';

@Component({
  selector: 'app-order-status-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './order-status-form.component.html',
  styleUrl: './order-status-form.component.css'
})
export class OrderStatusFormComponent implements OnChanges {
  @Output() orderStatusUpdated = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();
  @Input() orderToEdit: Order | null = null;

  orderStatusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService) {
    this.orderStatusForm = this.fb.group({
      status: ['', [Validators.required]]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderToEdit'] && this.orderStatusForm) {
      if (this.orderToEdit) {
        console.log(this.orderToEdit)
        this.orderStatusForm.patchValue(
          {
            status: this.orderToEdit.status
          }
        )
      }
    }
  }
  onSubmit() {
    const status = this.orderStatusForm.get('status')?.value;
    const orderId = this.orderToEdit?.id;
    
    if (orderId && status) {
      this.orderService.updateOrderStatus(orderId, status).subscribe({
        next: () => {
          console.log("order status was updated", status);
          this.orderStatusUpdated.emit();
        }
      })
    }

  }

  closeForm() {
    this.formClosed.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeForm();
    }
  }

  get status() {
    return this.orderStatusForm.get('staus');
  }
}
