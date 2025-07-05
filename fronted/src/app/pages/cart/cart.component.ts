import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Producto } from '../../interfaces/types';
import { selectCartState } from '../../store/selectors/cart.selector';
import { clearCart, decrementProductCount, incrementProductCount, removeItem } from '../../store/actions/cart.action';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private store = inject(Store<AppState>);
  productsInCart: Producto[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.store.select(selectCartState).subscribe(cartState => {
      //console.log('Current cart items:', cartState);
      this.productsInCart = cartState.products
    });
  }

  removeFromCart(productId: string){
    this.store.dispatch(removeItem({productId}));

  }

  clearCart(){
    this.store.dispatch(clearCart());
  }

  incrementProductQuantity(productId : string){
    this.store.dispatch(incrementProductCount({productId}));
  }

  decrementProductQuantity(productId : string){
    this.store.dispatch(decrementProductCount({productId}));
  }

  getTotalPrice() : number{
    return this.productsInCart.reduce((totalPrice, product) => {
        return totalPrice + (product.quantity * product.precio);
    }, 0);
  }


 
}
