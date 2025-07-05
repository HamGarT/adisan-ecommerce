import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../../interfaces/types';
import { Store } from '@ngrx/store';
import { selectAuthState, selectAuthenticatedUser } from '../../../store/selectors/auth.selector';
import { AppState } from '../../../store/app.state';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  fullImagePath: string;
  logedUser: Usuario | null = null;
  userInitials: string = '';
  constructor(private store: Store<AppState>) {
    this.fullImagePath = 'assets/logo.png';
    this.store.select(selectAuthenticatedUser).subscribe({
      next: (usuario) => {
        const apellidoInicial = usuario?.apellidos?.trim().split(/\s+/)[0]?.[0] || '';
        const nombreInicial = usuario?.nombres?.trim().split(/\s+/)[0]?.[0] || '';
        this.userInitials = apellidoInicial + nombreInicial;
        this.logedUser = usuario;
      }
    });
  }

}
