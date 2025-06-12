import { Component, inject } from '@angular/core';
import { PokemonCommunicationService } from '../../../service/pokemon-communication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  commService = inject(PokemonCommunicationService);

  randomPokemonImg() {
    this.commService.triggerRandomPokemon();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
