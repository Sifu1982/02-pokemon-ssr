import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Pokemons } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private pokemonsService = inject(Pokemons);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log(isStable);
  // });

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(console.log);
    // console.log(this.currentPage());

    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    // console.log({ pageToLoad, currentPage: this.currentPage() });

    return this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`PokemonSSR - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   console.log('destroy');

  //   this.$appState.unsubscribe();
  // }
}
