import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, map, filter, tap } from 'rxjs/operators';
import { PokeServiceService } from '../../../service/poke-service.service';
import type { Pokemon } from '../../../interfaces/interface';
import { CommonModule } from '@angular/common';

import { PokemonCommunicationService } from '../../../service/pokemon-communication.service';

@Component({
  selector: 'app-pokemon-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null = null;
  loading = true;

  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokeServiceService);
  private commService = inject(PokemonCommunicationService);

  ngOnInit(): void {
    // React to route parameter changes for 'id' (enables search from detail view)
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((idOrName): idOrName is string => !!idOrName),
        tap(() => {
          this.loading = true;
          this.pokemon = null;
        }),
        switchMap((idOrName) =>
          this.pokemonService.getPokemonInfo(idOrName).pipe(
            switchMap((poke) =>
              this.pokemonService.getPokemonSpecies(poke.id).pipe(
                map((species) => {
                  const entry = species.flavor_text_entries.find(
                    (e: any) => e.language.name === 'es'
                  );
                  (poke as any).description = entry?.flavor_text ?? '';
                  return poke;
                })
              )
            )
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

  getPokemonTypes(pokemon: Pokemon): string {
    return pokemon?.types?.map((t) => t.type.name).join(', ') ?? '';
  }

  onSearch(name: string) {
    if (name && name.trim()) {
      this.commService.triggerSearchPokemon(name.trim());
      // Navigate back to home to display search results
      // this.router.navigate(['/home']);
    }
  }
}
