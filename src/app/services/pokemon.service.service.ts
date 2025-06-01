import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Interfaces para tipar os dados recebidos da API
export interface Pokemon {
  id: number;
  name: string;
  description: string;
  height: number;
  weight: number;
  type: string[];
  stats: { [key: string]: number };
  ability: string[];
  move: string[];
  evolution: string[];
  spriteBase64: string;
  generation: string;
}

export interface PagedResponse {
  pokemons: Pokemon[];
  totalPages: number;
}

export interface PokemonFilter {
  name?: string;
  types?: string[];
  ability?: string;
  move?: string;
  generation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = 'http://localhost:8080/api/pokemons';

  constructor(private http: HttpClient) {}

  /**
   * Retorna todos os Pokémon sem paginação.
   */
  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/all`);
  }

  /**
   * Retorna Pokémon com paginação (page e limit).
   */
  getPokemons(page: number, limit: number): Observable<PagedResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => ({
        pokemons: response.content ?? [],
        totalPages: response.totalPages ?? 0,
      }))
    );
  }

  /**
   * Retorna um Pokémon pelo seu ID.
   */
  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }

  /**
   * Retorna Pokémon com base no nome.
   */
  getPokemonsByName(name: string): Observable<Pokemon[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Pokemon[]>(`${this.apiUrl}/name`, { params });
  }

  /**
   * Retorna Pokémon com base no tipo.
   */
  getPokemonsByType(type: string): Observable<Pokemon[]> {
    const params = new HttpParams().set('type', type);
    return this.http.get<Pokemon[]>(`${this.apiUrl}/type`, { params });
  }

  /**
   * Retorna Pokémon com base na habilidade.
   */
  getPokemonsByAbility(ability: string): Observable<Pokemon[]> {
    const params = new HttpParams().set('ability', ability);
    return this.http.get<Pokemon[]>(`${this.apiUrl}/ability`, { params });
  }

  /**
   * Retorna Pokémon com base no movimento.
   */
  getPokemonsByMove(move: string): Observable<Pokemon[]> {
    const params = new HttpParams().set('move', move);
    return this.http.get<Pokemon[]>(`${this.apiUrl}/move`, { params });
  }

  /**
   * Pesquisa avançada com múltiplos filtros (nome, tipos, habilidade, movimento, geração).
   */
  searchAdvancedPokemons(filters: PokemonFilter): Observable<Pokemon[]> {
    let params = new HttpParams();

    if (filters.name) {
      params = params.set('name', filters.name);
    }

    if (filters.types?.length) {
      filters.types.forEach(type => {
        params = params.append('types', type);
      });
    }

    if (filters.ability) {
      params = params.set('ability', filters.ability);
    }

    if (filters.move) {
      params = params.set('move', filters.move);
    }

    if (filters.generation) {
      params = params.set('generation', filters.generation);
    }

    return this.http.get<Pokemon[]>(`${this.apiUrl}/search/advanced`, { params });
  }
}
