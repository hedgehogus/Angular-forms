import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component2.html',
  styleUrl: './login.component2.css',
})
export class LoginComponent2 {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.form.value.email;
  }
}
