import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'loggedInUser';

  authenticate(username: string, password: string): boolean {
    return username === 'Ash' && password === 'pikachu';
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }
}
