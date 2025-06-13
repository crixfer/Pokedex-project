import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';
  messageColor: string = '';

  router = inject(Router);
  auth = inject(AuthService);

  onSubmit() {
    if (this.auth.authenticate(this.username, this.password)) {
      localStorage.setItem('user', this.username); // Guarda el usuario en localStorage
      this.loginMessage = 'Acceso Satisfactorio!';
      this.messageColor = 'green';
      setTimeout(() => {
        this.router.navigate(['/home']); // Redirige al home
      }, 1000);
    } else {
      this.loginMessage = 'Credenciales incorrectas!';
      this.messageColor = 'red';
    }
  }
}
