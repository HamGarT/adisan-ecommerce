import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
      apellido: ['', [Validators.required, Validators.minLength(2), this.noWhitespaceValidator]],
      fecha: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.maxLength(8), this.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ['', [Validators.required, this.noWhitespaceValidator]]
    });
  }

  onSubmit(){

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
