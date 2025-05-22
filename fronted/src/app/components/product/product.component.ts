import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';

interface Categoria {
  id: number;
  nombre: string;
}

interface ProductData {
  nombre: string;
  precio: number;
  stock: number;
  imageProduct: File | null;
  categoria: Categoria;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  categorias: Categoria[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoriaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load categorias from backend
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.http.get<Categoria[]>('http://localhost:5459/api/v1/categories').subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error loading categorias:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
    console.log(file)
  }

  onSubmit(): void {
    if (this.productForm.valid && this.selectedFile) {
      
      const imageFormData = new FormData();
      imageFormData.append('file', this.selectedFile);
      
      console.log(this.selectedFile);
      console.log(imageFormData.get("file"));
  
      this.http.post<any>('http://localhost:5459/api/v1/images/upload', imageFormData).subscribe(
        (imageResponse) => {

         
          const productData = {
            nombre: this.productForm.get('nombre')?.value,
            precio: this.productForm.get('precio')?.value,
            stock: this.productForm.get('stock')?.value,
            categoria: {
              id: this.productForm.get('categoriaId')?.value
            },
            imageKey: imageResponse.name,
          };

         
          this.http.post<any>('http://localhost:5459/api/v1/product/add', productData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).subscribe(
            (response) => {
              console.log('Product saved successfully', response);
              this.resetForm();
            },
            (error) => {
              console.error('Error saving product:', error);
            }
          );
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.productForm.reset({
      nombre: '',
      precio: 0,
      stock: 0,
      categoriaId: ''
    });
    this.selectedFile = null;
  }
}