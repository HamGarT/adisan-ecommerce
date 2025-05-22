import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  fullImagePath: string;

  constructor() {
    this.fullImagePath = 'assets/logo.png'
  }
}
