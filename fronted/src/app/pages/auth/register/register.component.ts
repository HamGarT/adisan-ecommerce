import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService : UsuarioService,
    private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
      apellido: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
      fecha: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.maxLength(8), this.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }

  onSubmit() {
    const usuario = {
      dni: this.registerForm.get('dni')?.value,
      nombres: this.registerForm.get('nombre')?.value,
      apellidos: this.registerForm.get('apellido')?.value,
      fechaNacimiento: this.registerForm.get('fecha')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }
    this.usuarioService.create(usuario).subscribe({
      next: ()=>{
        console.log("User has been successlly created");
        this.router.navigate(['/auth/login']);
      },
      error: (error) =>{
        console.error('Error creating user: ', error);
      }
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { 'whitespace': true };
  }

  get nombre() { return this.registerForm.get('nombre') }
  get apellido() { return this.registerForm.get('apellido') }
  get fecha() { return this.registerForm.get('fecha') }
  get dni() { return this.registerForm.get('dni') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }

}
