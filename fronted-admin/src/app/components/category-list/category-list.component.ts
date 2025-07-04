import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../interfaces';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [NgIf, NgFor],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  @Output() editCategory = new EventEmitter<any>();
  categories: Categoria[] = [];
  paginaActual = 1;
  itemsPorPagina = 5;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  onEditClick(categoria:any){
    this.editCategory.emit(categoria)
  }

  onDelete(idCategory : number){
    this.categoryService.delete(idCategory).subscribe(
      {
        next: ()=>{
          this.categories = this.categories.filter( c => c.id !== idCategory)
        },
        error: (error)=>{
          console.error('Error deleting category:', error);
        }
      }
    );

  }

  get categoriesPaginadas() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.categories.slice(inicio, fin);
  }
  refreshList() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }

    });
  }

  get totalPaginas() {
    return Math.ceil(this.categories.length / this.itemsPorPagina);
  }

  get paginasArray() {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }


  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }

}
