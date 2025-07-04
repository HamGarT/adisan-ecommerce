import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../interfaces';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnChanges {
  @Input() categoryToEdit: Categoria | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() categoryCreated = new EventEmitter<void>();
  @Output() categoryUpdated = new EventEmitter<void>();
  categoryForm: FormGroup;
  isLoading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), this.noWhiteSpaceValidator]]
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryToEdit'] && this.categoryForm) {
      this.checkEditMode();
    }
  }

  onSubmit() {
    if(this.isEditMode){
      this.updateCategory();
    }else{
      this.createCategory();
    }
  }

  private createCategory() {
    this.categoryService.create(this.categoryForm.get('name')?.value).subscribe({
      next: () => {
        this.categoryCreated.emit();
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating category', error);
        this.isLoading = false;
      }
    })
  }

  private updateCategory() {
    const categoriaId = this.categoryToEdit?.id;
    if (!categoriaId) {
      console.error('Category ID is undefined. Cannot update product.');
      return;
    }
    this.categoryService.update(categoriaId, this.categoryForm.get('name')?.value).subscribe(
      {
        next: () => {
          this.categoryUpdated.emit();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.isLoading = false;
        }
      }
    )
  }

  checkEditMode(): void {
    if (this.categoryToEdit) {
      this.isEditMode = true;
      this.populateCategoryForm()
    } else {
      this.isEditMode = false;
    }
  }
  populateCategoryForm(): void {
    if (this.categoryToEdit) {
      this.categoryForm.patchValue(
        {
          name: this.categoryToEdit.nombre
        }
      )
    }
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

  noWhiteSpaceValidator(control: FormControl) {

    return (control.value || '').trim().length ? null : { 'whitespace': true }

  }
  get name() { return this.categoryForm.get('name') }
}
