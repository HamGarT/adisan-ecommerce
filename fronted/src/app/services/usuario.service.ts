import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationRequest, Usuario } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:5459/api/v1/user';
  constructor(private http: HttpClient) { }

  create(usuario : Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}/create`, usuario )
  }

  login(request : AuthentificationRequest): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}/login`, request)
  }

}
