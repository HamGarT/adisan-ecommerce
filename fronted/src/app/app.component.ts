import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true, // Add this line to indicate it's a standalone component
  imports: [RouterOutlet, CommonModule, ProductComponent, HeaderComponent], // Remove BrowserModule, add CommonModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {






  // selectedFile: File | null = null;
  // previewUrl: string | ArrayBuffer | null = null;
  // uploadUrl: string = 'http://localhost:8080/images/upload';

  // constructor(private http: HttpClient) {}

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];

  //   // Preview image
  //   const reader = new FileReader();
  //   reader.onload = e => this.previewUrl = reader.result;
  //   reader.readAsDataURL(this.selectedFile!);
  // }

  // upload(): void {
  //   if (!this.selectedFile) return;

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);

  //   this.http.post(this.uploadUrl, formData).subscribe({
  //     next: res => {
  //       alert('Upload successful!');
  //       this.selectedFile = null;
  //       this.previewUrl = null;
  //     },
  //     error: err => {
  //       console.error(err);
  //       alert('Upload failed.');
  //     }
  //   });
  // }
}
