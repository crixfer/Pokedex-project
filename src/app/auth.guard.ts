import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

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
