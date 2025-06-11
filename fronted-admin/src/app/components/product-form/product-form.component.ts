import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../interfaces';


@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();
  @Output() productCreated = new EventEmitter<any>();
  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isLoading = false;
  categories: Categoria[] = []



  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private categoryService: CategoryService

  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      file: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadCategories();
  }


  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data
        console.log(data)
      },

      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  closeForm() {

    this.resetForm();
    this.formClosed.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeForm();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.patchValue({ file: file });

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid && this.selectedFile) {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('nombre', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('precio', this.productForm.get('price')?.value);
      formData.append('categoria', this.productForm.get('category')?.value);
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:5459/api/v1/product/add-two', formData)
        .subscribe({
          next: (response) => {
            console.log('Product created successfully:', response);
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating product:', error);
            this.isLoading = false;
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      category: '',
      file: null
    });
    this.selectedFile = null;
    this.imagePreview = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.markAsTouched();
    });
  }


  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get category() { return this.productForm.get('category'); }
  get file() { return this.productForm.get('file'); }
  get stock(){ return this.productForm.get('stock');}
}