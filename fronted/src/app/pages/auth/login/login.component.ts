import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { authActions } from '../../../store/actions/auth.action';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private store = inject(Store<AppState>);
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }

  onSubmit() {

    const loginData = this.loginForm.getRawValue();
    this.usuarioService.login(loginData).subscribe({
      next: (response) => {
        console.log(response);
        this.store.dispatch(authActions.loginSuccess({user: response}))
      },

      error: (error) => {
        console.error('login failed: ', error)
      }
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { 'whitespace': true }
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
