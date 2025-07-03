import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Producto } from '../interfaces/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5459/api/v1/product';
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  getById( id: string) : Observable<Producto>{
    return this.http.get<Producto>(`${this.baseUrl}/${id}`)
  }
}
