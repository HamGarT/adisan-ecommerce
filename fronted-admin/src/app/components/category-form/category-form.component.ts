import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() categoryAdded = new EventEmitter<void>();
  

  categoryForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  onSubmit() {
    this.http.post("http://localhost:5459/api/v1/categories/add",
      {
        nombre: this.categoryForm.get('name')?.value
      }
    ).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.categoryAdded.emit(); 
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.isLoading = false;
      }
    });
  }

  closeForm() {
    this.resetForm();
    this.formClosed.emit();
  }
  resetForm() {
    this.categoryForm.reset(
      { name: '' }
    )
  }
  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeForm();
    }
  }
  get name() { return this.categoryForm.get('name') }
}
