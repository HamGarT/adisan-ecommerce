import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../interfaces';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Categoria[] = [];
  constructor(private categoryService : CategoryService){}
  
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) =>{
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }

    });
  }

}
