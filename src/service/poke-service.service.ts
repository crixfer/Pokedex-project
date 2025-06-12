import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class PokeServiceService {
  constructor(private http: HttpClient) {}

  //VARIABLES
  randomId = Math.floor(Math.random() * 151) + 1;
  private randomPokeApi = `https://pokeapi.co/api/v2/pokemon/${this.randomId}`;
  private pokeInfo = 'https://pokeapi.co/api/v2/pokemon/';

  //METHODS

  //RANDOM
  getRandomPokemons(): Observable<any> {
    return this.http.get(this.randomPokeApi);
  }
  //INFORMATION
  getPokemonInfo(name: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeInfo}/${name}`);
  }

  getPokemonSpecies(idOrName: number | string): Observable<any> {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`
    );
  }

  // Obtener todos los tipos de Pokémon
  getAllTypes(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/type');
  }

  // Obtener pokémon por tipo
  getPokemonsByType(type: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/type/${type}`);
  }
}
