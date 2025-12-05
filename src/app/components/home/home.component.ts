import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonService } from '../../services/pokemon.service.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    RouterModule,
    PokemonDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allPokemons: Pokemon[] = [];
  displayedPokemons: Pokemon[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  limit: number = 9;
  totalPages: number = 0;
  loading: boolean = false;
  endReached: boolean = false;
  showAdvancedSearch: boolean = false;
  selectedTypes: string[] = [];
  selectedPokemonId: number | null = null;
  showScrollTopButton = false;
  closingCard = false;

  @ViewChild('detailsCard') detailsCard!: ElementRef<HTMLDivElement>;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  /** Seleciona um Pokémon para abrir o card */
  selectPokemon(id: number): void {
    this.selectedPokemonId = id;
    this.closingCard = false;
  }

  /** Função chamada pelo PokemonDetailsComponent quando clica em uma evolução */
  selectEvolutionPokemon(evoId: number) {
    if (!evoId) return;

    // Fade-out do card atual
    this.closingCard = true;

    setTimeout(() => {
      // Troca para o Pokémon da evolução
      this.selectedPokemonId = evoId;
      this.closingCard = false;

      // Aguarda renderização e rola para o topo
      setTimeout(() => {
        if (this.detailsCard) {
          this.detailsCard.nativeElement.scrollTop = 0;
        }
      }, 50);
    }, 300); // tempo da animação de fade-out
  }

  /** Fecha o card */
  closePokemonDetails() {
    this.selectedPokemonId = null;
  }

  /** Carrega todos os Pokémons */
  loadAllPokemons(): void {
    this.loading = true;
    this.pokemonService.getAllPokemons().subscribe(
      (pokemons: Pokemon[]) => {
        this.allPokemons = pokemons;
        this.totalPages = Math.ceil(this.allPokemons.length / this.limit);
        this.updateDisplayedPokemons();
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar todos os pokémons:', error);
        this.loading = false;
      }
    );
  }

  /** Atualiza a lista exibida de acordo com a paginação */
  updateDisplayedPokemons(): void {
    const startIndex = this.currentPage * this.limit;
    const endIndex = startIndex + this.limit;
    this.displayedPokemons = this.filteredPokemons.slice(0, endIndex);
    this.endReached = endIndex >= this.filteredPokemons.length;
  }

  /** Retorna a lista filtrada por busca */
  get filteredPokemons(): Pokemon[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.allPokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(term) ||
        pokemon.id.toString().includes(term)
    );
  }

  /** Carrega mais Pokémons ao scroll */
  loadPokemons(): void {
    if (this.loading || this.endReached) return;
    this.loading = true;
    setTimeout(() => {
      this.currentPage++;
      this.updateDisplayedPokemons();
      this.loading = false;
    }, 500);
  }

  onSearchTermChange(): void {
    this.currentPage = 0;
    this.endReached = false;
    this.totalPages = Math.ceil(this.filteredPokemons.length / this.limit);
    this.updateDisplayedPokemons();
  }

  /** Retorna cor do tipo do Pokémon */
  getTypeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'fire': return 'text-orange-500';
      case 'fighting': return 'text-orange-700';
      case 'flying': return 'text-blue-300';
      case 'water': return 'text-blue-500';
      case 'ice': return 'text-blue-700';
      case 'grass': return 'text-green-500';
      case 'bug': return 'text-green-700';
      case 'ground': return 'text-yellow-500';
      case 'electric': return 'text-yellow-300';
      case 'dragon': return 'text-red-500';
      case 'rock': return 'text-yellow-700';
      case 'psychic': return 'text-pink-700';
      case 'fairy': return 'text-pink-500';
      case 'ghost': return 'text-purple-500';
      case 'poison': return 'text-purple-700';
      case 'dark': return 'text-black';
      default: return 'text-gray-500';
    }
  }

  /** TrackBy para lista de Pokémon */
  trackPokemon(index: number, pokemon: Pokemon): number {
    return pokemon.id;
  }

  availableTypes: string[] = [
    'normal','fire','water','grass','electric','ice','fighting','poison',
    'ground','flying','psychic','bug','rock','ghost','dark','dragon','steel','fairy'
  ];

  regions: string[] = [
    'Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar','Paldea'
  ];

  regionToGenerationMap: { [key: string]: string } = {
    Kanto: 'generation-i',
    Johto: 'generation-ii',
    Hoenn: 'generation-iii',
    Sinnoh: 'generation-iv',
    Unova: 'generation-v',
    Kalos: 'generation-vi',
    Alola: 'generation-vii',
    Galar: 'generation-viii',
    Paldea: 'generation-ix',
  };

  advancedSearch = {
    ability: '',
    move: '',
    region: '',
  };

  toggleTypeSelection(type: string): void {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
  }

  resetAdvancedSearch(): void {
    this.selectedTypes = [];
    this.advancedSearch = { ability: '', move: '', region: '' };
    this.searchTerm = '';
    this.showAdvancedSearch = false;
    this.loadAllPokemons();
  }

  applyAdvancedSearch(): void {
    this.loading = true;
    this.currentPage = 0;
    this.endReached = false;

    const filters = {
      name: this.searchTerm.trim() || undefined,
      types: this.selectedTypes.length > 0 ? this.selectedTypes : undefined,
      ability: this.advancedSearch.ability.trim() || undefined,
      move: this.advancedSearch.move.trim() || undefined,
      generation: this.advancedSearch.region
        ? this.regionToGenerationMap[this.advancedSearch.region]
        : undefined,
    };

    this.pokemonService.searchAdvancedPokemons(filters).subscribe(
      (pokemons: Pokemon[]) => {
        this.allPokemons = pokemons;
        this.totalPages = Math.ceil(pokemons.length / this.limit);
        this.updateDisplayedPokemons();
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao realizar busca avançada:', error);
        this.loading = false;
      }
    );

    this.showAdvancedSearch = false;
  }

  onScroll(container: HTMLElement) {
    this.showScrollTopButton = container.scrollTop > 200;
  }
}
