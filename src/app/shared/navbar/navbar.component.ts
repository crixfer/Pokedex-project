import { Component, inject } from '@angular/core';
import { PokemonCommunicationService } from '../../../service/pokemon-communication.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  message: string = '';

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
    const term = name.trim();
    if (!term) {
      this.message = 'Ingresa el nombre de un Pokémon';
      return;
    }
    this.message = '';
    this.router.navigate(['/detail', term.toLowerCase()]);
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
