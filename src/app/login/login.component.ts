import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
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

  router = Inject(Router);
  auth = Inject(AuthService);

  onSubmit() {
    if (this.auth.authenticate(this.username, this.password)) {
      this.loginMessage = 'Acceso Satisfactorio!';
      this.messageColor = 'green';
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      this.loginMessage = 'Credenciales Incorrectas!';
      this.messageColor = 'red';
    }
  }
}
