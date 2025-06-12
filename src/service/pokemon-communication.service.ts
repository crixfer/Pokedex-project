import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonCommunicationService {
  private randomPokemonSubject = new Subject<void>();
  randomPokemon$ = this.randomPokemonSubject.asObservable();

  private searchPokemonSource = new Subject<string>();
  searchPokemon$ = this.searchPokemonSource.asObservable();

  triggerRandomPokemon() {
    this.randomPokemonSubject.next();
  }

  triggerSearchPokemon(name: string) {
    this.searchPokemonSource.next(name);
  }
  constructor() {}
}
