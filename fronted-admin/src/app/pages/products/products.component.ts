import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../interfaces';
import { NgIf } from '@angular/common';
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
  constructor(private productService: ProductService) { };

  ngOnInit() {
    this.loadProducts();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  loadProducts() {
    this.productService.getAll().subscribe({ //an observable return a asyncronous response .suscribe() it susbcribes to that observable so we can recieve the asyncronous response when it arrive
      next: (data) => {
        this.productos = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }



}
