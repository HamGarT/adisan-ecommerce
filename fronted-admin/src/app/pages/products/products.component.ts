import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../interfaces';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductFormComponent } from "../../components/product-form/product-form.component";

@Component({
  selector: 'app-products',
  imports: [NgIf, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  showForm = false;
  productos: Producto[] = [];
  selectedProduct: Producto | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
    
  ) { };

  ngOnInit() {
    this.loadProducts();

  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.selectedProduct = null;
    }
  }

  loadProducts() {
    this.productService.getAll().subscribe({ //an observable return a asyncronous response .suscribe() it susbcribes to that observable so we can recieve the asyncronous response when it arrive
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }
  
  onDelete(id: string) {
    this.productService.delete(id).subscribe({
        next: () => {
            console.log('Product deleted successfully');
            this.productos = this.productos.filter(p => p.id !== id);
        },
        error: (error) => {
            console.error('Error deleting product:', error);
        }
    });
  }

  onEdit(producto: any) {
    this.selectedProduct = producto;
    this.showForm = true;
  }
  
  onProductUpdated() {
    this.loadProducts(); 
    this.toggleForm(); 
  }
 


}
