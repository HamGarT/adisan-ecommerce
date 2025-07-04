import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Categoria, Producto } from '../../interfaces';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() productToEdit: Producto | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() productCreated = new EventEmitter<any>();
  @Output() productUpdated = new EventEmitter<any>();

  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  currentImageUrl: string | null = null;
  isLoading = false;
  isEditMode = false;
  categories: Categoria[] = []

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productForm) {
      this.checkEditMode();
    }
  }

  onSubmit(): void {

    this.isLoading = true;
    const formData = new FormData();
    formData.append('nombre', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('precio', this.productForm.get('price')?.value);
    formData.append('categoria', this.productForm.get('category')?.value);
    formData.append('stock', this.productForm.get('stock')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    if (this.isEditMode) {
      this.updateProduct(formData);
    } else {
      this.createProduct(formData);
    }

  }

  checkEditMode(): void {
    if (this.productToEdit) {
      this.isEditMode = true;
      this.populateFormForEdit();
      this.productForm.get('file')?.clearValidators();
    } else {
      this.isEditMode = false;
      this.productForm.get('file')?.setValidators([Validators.required]);
    }
    this.productForm.get('file')?.updateValueAndValidity();
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
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  private createProduct(formData: FormData) {

    this.productService.create(formData).subscribe({
      next: (response) => {
        this.resetForm();
        this.productCreated.emit(response);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.isLoading = false;
      }
    });

  }

  private updateProduct(formData: FormData) {
    const productId = this.productToEdit?.id;
    console.log("updating.....")
    if (!productId) {
      console.error('Product ID is undefined. Cannot update product.');
      return;
    }
    this.productService.update(productId, formData).subscribe({
      next: (response) => {
        this.resetForm();
        this.productUpdated.emit(response);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.isLoading = false;
      }
    });

  }

  private populateFormForEdit() {
    if (this.productToEdit) {
      this.productForm.patchValue({
        name: this.productToEdit.nombre,
        price: this.productToEdit.precio,
        stock: this.productToEdit.stock,
        category: this.productToEdit.categoria?.id || this.productToEdit.categoria
      });

      if (this.productToEdit.imageUrl) {
        this.imagePreview = this.productToEdit.imageUrl;
      }
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { 'whitespace': true };
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get category() { return this.productForm.get('category'); }
  get file() { return this.productForm.get('file'); }
  get stock() { return this.productForm.get('stock'); }
}