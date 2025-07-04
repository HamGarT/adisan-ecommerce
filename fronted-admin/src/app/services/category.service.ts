import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:5459/api/v1/categories';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl)
  }

  create(nameCategory : string): Observable<{nombre : string}>{
    return this.http.post<{nombre : string}>(`${this.baseUrl}/add`, {nombre : nameCategory} )
  }

  update(id:number, nameCategory: string) : Observable<{nombre : string}>{
    return this.http.put<{nombre:string}>(`${this.baseUrl}/update/${id}`, {nombre: nameCategory})
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
