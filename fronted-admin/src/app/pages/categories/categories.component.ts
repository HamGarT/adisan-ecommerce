import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategoryListComponent } from "../../components/category-list/category-list.component";
import { CategoryFormComponent } from "../../components/category-form/category-form.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CategoryListComponent, CategoryFormComponent, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @ViewChild('categoryList') categoryListComponent!: CategoryListComponent;
  selectedCategory : any = null

  showForm = false;
  toggleForm() {
    this.showForm = !this.showForm;
  }
  onCategoryUpdated() {
    this.showForm = false;
    this.categoryListComponent.refreshList();
  }
  
  onEditCategory(category: any){
    this.selectedCategory = category;
    this.showForm = true
  }
}
