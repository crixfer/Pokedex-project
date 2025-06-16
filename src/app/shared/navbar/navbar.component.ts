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
  private commService = inject(PokemonCommunicationService);
  private router = inject(Router);
  private authService = inject(AuthService);

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

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
