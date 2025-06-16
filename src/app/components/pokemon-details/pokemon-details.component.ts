import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { PokeServiceService } from '../../../service/poke-service.service';
import type { Pokemon } from '../../../interfaces/interface';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  imports: [CommonModule, NavbarComponent, RouterLink],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null = null;
  loading = true;

  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokeServiceService);

  ngOnInit(): void {
    const idOrName = this.route.snapshot.paramMap.get('id');
    if (!idOrName) {
      this.loading = false;
      return;
    }

    this.pokemonService
      .getPokemonInfo(idOrName)
      .pipe(
        switchMap((poke) =>
          this.pokemonService.getPokemonSpecies(poke.id).pipe(
            map((species) => {
              const entry = species.flavor_text_entries.find(
                (e: { language: { name: string }; flavor_text: string }) =>
                  e.language.name === 'es'
              );
              (poke as any).description = entry?.flavor_text ?? '';
              return poke;
            })
          )
        )
      )
      .subscribe({
        next: (poke) => {
          this.pokemon = poke;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  getBestSprite(): string {
    const poke = this.pokemon!;
    return (
      poke.sprites.other?.['official-artwork']?.front_default ??
      poke.sprites.other?.dream_world?.front_default ??
      poke.sprites.front_default ??
      ''
    );
  }
}
