import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Pokemons {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map(({ results }) =>
          results.map(({ name, url }) => ({
            name,
            id: url.split('/').at(-2) ?? '',
          }))
        )
        // tap(console.log)
      );
  }

  public loadPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
