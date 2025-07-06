import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { OrderRequest, productForOrder, Producto } from '../../interfaces/types';
import { selectCartState } from '../../store/selectors/cart.selector';
import { clearCart, decrementProductCount, incrementProductCount, removeItem } from '../../store/actions/cart.action';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectAuthenticatedUserId } from '../../store/selectors/auth.selector';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private store = inject(Store<AppState>);
  productsInCart: Producto[] = [];
  infoOrderForm: FormGroup

  constructor(private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.infoOrderForm = this.fb.group({
      departamento: [{ value: 'Cajamarca', disabled: true }, [Validators.required]],
      provincia: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.store.select(selectCartState).subscribe(cartState => {
      this.productsInCart = cartState.products
    });
  }

  removeFromCart(productId: string) {
    this.store.dispatch(removeItem({ productId }));

  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  incrementProductQuantity(productId: string) {
    this.store.dispatch(incrementProductCount({ productId }));
  }

  decrementProductQuantity(productId: string) {
    this.store.dispatch(decrementProductCount({ productId }));
  }

  getTotalPrice(): number {
    return this.productsInCart.reduce((totalPrice, product) => {
      return totalPrice + (product.quantity * product.precio);
    }, 0);
  }

  createOrderFromCartProducts() {
    if (this.productsInCart.length) {
      const productForOrder: productForOrder[] = this.productsInCart.map(product => ({ id: product.id, cantidad: product.quantity }));
      this.store.select(selectAuthenticatedUserId).subscribe({
        next: (usuarioId) => {
          if (usuarioId) {
            const orderRequest: OrderRequest = {
              userId: usuarioId,
              departamento: this.infoOrderForm.get('departamento')?.value,
              provincia: this.infoOrderForm.get('provincia')?.value,
              direccion: this.infoOrderForm.get('direccion')?.value,
              orderItems: productForOrder
            }
            this.orderService.create(orderRequest).subscribe({
              next: () => {
                console.log("The order was entered successfully")
              }
            });
          } else {
            this.router.navigate(['/auth/login'])
          }

        }
      });
    }else{
      alert('che no hay nada en carrito.')
    }
  }



}
