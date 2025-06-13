import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = Inject(AuthService);
  const router = Inject(Router);

  if (authService.getAuthStatus()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
