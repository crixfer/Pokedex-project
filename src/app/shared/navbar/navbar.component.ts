import { Component, inject } from '@angular/core';
import { PokemonCommunicationService } from '../../../service/pokemon-communication.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  commService = inject(PokemonCommunicationService);
  authService = inject(AuthService);
  router = inject(Router);

  randomPokemonImg() {
    this.commService.triggerRandomPokemon();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(name: string) {
    if (name && name.trim()) {
      this.commService.triggerSearchPokemon(name.trim());
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
