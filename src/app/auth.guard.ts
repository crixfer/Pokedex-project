import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('user'); // Simula autenticación
    if (isAuthenticated) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/']); // Redirige al login
      return false; // Deniega el acceso
    }
  }
}
