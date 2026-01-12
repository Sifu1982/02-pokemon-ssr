import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {
  private pokemonsService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChange = effect(() => this.loadPokemons(this.currentPage()));

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    return this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(tap(() => this.title.setTitle(`PokemonSSR - Page ${pageToLoad}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
