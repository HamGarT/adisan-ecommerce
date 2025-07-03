import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Producto } from '../../interfaces/types';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addToCart } from '../../store/actions/cart.action';
import { take } from 'rxjs';
import { selectCartState } from '../../store/selectors/cart.selector';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Output() cardClosed = new EventEmitter<void>();
  @Input() product: Producto | null = null;
  private store = inject(Store<AppState>);
  constructor(private productService: ProductService) { }
  quantity: number = 3;

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addProductToCart(id: string): void {
    this.productService.getById(id).subscribe({
      next: (product: Producto) => {
        console.log(product);
        this.store.dispatch(addToCart({ product }));
        this.store.select(selectCartState).subscribe(cartItems => {
          console.log('Current cart items:', cartItems);
        });
      },
      error: (err) => {
        console.error('Failed to load product', err);
      }
    });
  }

  getTotalPrice(): number {
    return (this.product?.precio ?? 0) * this.quantity;
  }

  closeCard() {
    this.cardClosed.emit();
  }
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeCard();
    }
  }
}
