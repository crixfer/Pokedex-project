import { Component, inject, OnInit } from '@angular/core';
import { PokeServiceService } from '../../../service/poke-service.service';
import type { Pokemon } from '../../../interfaces/interface';
import { PokemonCommunicationService } from '../../../service/pokemon-communication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  pokemons: Pokemon[] = [];

  page: number = 0;
  pageSize: number = 12;
  loading = false;
  showOrdered = true;

  //POKEMON SERVICE
  pokemonService = inject(PokeServiceService);
  commService = inject(PokemonCommunicationService);
  router = inject(Router);

  showTypeMenu = false;
  pokemonTypes: any[] = [];
  selectedType: string | null = null;
  isClosingTypeMenu = false;

  randomPokemonSprite: string | undefined; // Nueva propiedad para la sprite animada

  ngOnInit(): void {
    this.commService.randomPokemon$.subscribe(() => {
      this.showOrdered = false;
      this.randomPokemons();
    });

    // Detecta navegación a /home para restaurar el estado inicial
    this.router.events.subscribe((event: any) => {
      if (event?.url === '/home') {
        this.resetToOrdered();
      }
    });

    this.commService.searchPokemon$.subscribe((name: string) => {
      this.searchPokemonByName(name);
    });

    this.loadPokemons();
  }

  async loadPokemons(): Promise<void> {
    this.loading = true;
    const start = this.page * this.pageSize + 1;
    const end = start + this.pageSize;
    const pokemons: Pokemon[] = [];

    for (let i = start; i < end; i++) {
      try {
        const pokemon = await this.pokemonService.getPokemonInfo(i).toPromise();
        if (!pokemon) continue;
        const species = await this.pokemonService
          .getPokemonSpecies(i)
          .toPromise();
        const entry = species.flavor_text_entries.find(
          (e: any) => e.language.name === 'es'
        );
        (pokemon as any).description = entry ? entry.flavor_text : '';
        pokemons.push(pokemon);
      } catch (e) {
        // Si falla uno, simplemente lo omite
      }
    }

    if (this.page === 0) {
      this.pokemons = pokemons;
    } else {
      this.pokemons = this.pokemons.concat(pokemons);
    }
    this.loading = false;
  }

  loadMore(): void {
    this.page++;
    this.loadPokemons();
  }

  //RANDOM

  randomPokemons(): void {
    this.showOrdered = false;
    const randomId = Math.floor(Math.random() * 151) + 1; //1 a 151
    this.pokemonService.getPokemonInfo(randomId).subscribe((pokemon) => {
      this.pokemonService.getPokemonSpecies(randomId).subscribe((species) => {
        const entry = species.flavor_text_entries.find(
          (e: any) => e.language.name === 'es'
        );
        (pokemon as any).description = entry ? entry.flavor_text : '';
        //puedes mostrarlo en una carta especial. o reeplazar el primero;
        this.pokemons = [pokemon];

        // Nueva lógica para la sprite animada
        const animatedSprite =
          pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated
            ?.front_default || pokemon.sprites.front_default; // fallback si no hay animado

        // Asignar a la propiedad para usar en el template
        this.randomPokemonSprite = animatedSprite;
      });
    });
  }

  getPokemonTypes(pokemon: Pokemon): string {
    return pokemon?.types?.map((t) => t.type.name).join(', ') ?? '';
  }

  resetToOrdered(): void {
    this.showOrdered = true;
    this.page = 0;
    this.pokemons = [];
    this.loadPokemons();
  }

  moreRandomPokemons(): void {
    this.randomPokemons();
  }

  randomPokemonImg() {
    this.commService.triggerRandomPokemon();
  }

  toggleTypeMenu() {
    this.showTypeMenu = !this.showTypeMenu;
    if (this.showTypeMenu && this.pokemonTypes.length === 0) {
      this.fetchPokemonTypes();
    }
  }

  fetchPokemonTypes() {
    this.pokemonService.getAllTypes().subscribe((res: any) => {
      this.pokemonTypes = res.results;
    });
  }

  selectType(type: any) {
    this.selectedType = type.name;
    this.showTypeMenu = false;
    this.page = 0;
    this.loadPokemonsByType(type.name);
  }

  loadPokemonsByType(typeName: string) {
    this.loading = true;
    this.pokemonService.getPokemonsByType(typeName).subscribe((res: any) => {
      const pokemonEntries = res.pokemon.slice(0, this.pageSize);
      const requests = pokemonEntries.map((entry: any) => {
        const pokeName = entry.pokemon.name;
        return this.pokemonService
          .getPokemonInfo(pokeName)
          .toPromise()
          .then((pokemon) => {
            if (!pokemon) return undefined;
            return this.pokemonService
              .getPokemonSpecies(pokemon.id)
              .toPromise()
              .then((species) => {
                const entry = species.flavor_text_entries.find(
                  (e: any) => e.language.name === 'es'
                );
                (pokemon as any).description = entry ? entry.flavor_text : '';
                return pokemon;
              });
          });
      });
      Promise.all(requests).then((results) => {
        this.pokemons = results.filter((p): p is Pokemon => p !== undefined);
        this.loading = false;
        this.showOrdered = false;
      });
    });
  }

  onTypeMenuAnimationEnd() {
    if (this.isClosingTypeMenu) {
      this.isClosingTypeMenu = false;
      this.showTypeMenu = false;
    }
  }

  closeTypeMenu() {
    this.isClosingTypeMenu = true;
    // El cierre real ocurre en onTypeMenuAnimationEnd
  }

  // Para *ngFor con trackBy
  trackByIndex(index: number, item: any) {
    return index;
  }

  //SEARCHING POKEMONS
  searchPokemonByName(name: string): void {
    this.loading = true;
    this.pokemonService.getPokemonInfo(name.toLowerCase()).subscribe({
      next: (pokemon) => {
        this.pokemonService.getPokemonSpecies(pokemon.id).subscribe({
          next: (species) => {
            const entry = species.flavor_text_entries.find(
              (e: any) => e.language.name === 'es'
            );
            (pokemon as any).description = entry ? entry.flavor_text : '';
            this.pokemons = [pokemon];
            this.loading = false;
            this.showOrdered = false;
          },
          error: () => {
            this.loading = false;
          },
        });
      },
      error: () => {
        this.pokemons = [];
        this.loading = false;
        // Aquí puedes mostrar un mensaje de "Pokémon no encontrado"
      },
    });
  }
}
