import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../interfaces/types';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addToCart } from '../../store/actions/cart.action';

@Component({
  selector: 'app-shop',
  imports: [ProductCardComponent, NgIf],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  private store = inject(Store<AppState>)
  products: Producto[] = [];
  selectedProduct: Producto | null = null;
  showCard = false;
  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleCard(product?: any) {
    this.showCard = !this.showCard;
    console.log(product);
    if (product) {
      this.selectedProduct = product;
    }
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    })
  }

  addSampleProduct(id: string) {
    
  }

}
