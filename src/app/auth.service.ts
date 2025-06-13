import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  authenticate(username: string, password: string): boolean {
    const logged = username === 'Ash' && password === 'pikachu';
    this.isAuthenticated = logged;
    return logged;
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}
