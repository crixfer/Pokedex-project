import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticate(username: string, password: string): boolean {
    return username === 'Ash' && password === 'pikachu';
  }
  constructor() {}
}
