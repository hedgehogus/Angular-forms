import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { LoginComponent2 } from "./auth/login-2/login.component2";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, LoginComponent2],
})
export class AppComponent {}
