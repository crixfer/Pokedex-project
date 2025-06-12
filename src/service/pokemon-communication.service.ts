import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonCommunicationService {
  private randomPokemonSubject = new Subject<void>();
  randomPokemon$ = this.randomPokemonSubject.asObservable();

  triggerRandomPokemon() {
    this.randomPokemonSubject.next();
  }
  constructor() {}
}
