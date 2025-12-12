import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pokemon, PokemonService } from '../../services/pokemon.service.service';
import { LoadingComponent } from '../loading/loading.component';
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
  pages: (number | string)[] = [];
  loading: boolean = false;
  showAdvancedSearch: boolean = false;
  selectedTypes: string[] = [];
  selectedPokemonId: number | null = null;
  closingCard = false;

  // 🔥 ADICIONADO: Breakpoint para 860px
  isDesktop: boolean = window.innerWidth > 860;

  @ViewChild('detailsCard') detailsCard!: ElementRef<HTMLDivElement>;

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

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadAllPokemons();

    // 🔥 Atualizar automaticamente ao mexer o tamanho da janela
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth > 860;
    });
  }

  displayPage(page: number | string): string | number {
    return typeof page === 'number' ? page + 1 : page;
  }

  loadAllPokemons(): void {
    this.loading = true;
    this.pokemonService.getAllPokemons().subscribe(
      (pokemons: Pokemon[]) => {
        this.allPokemons = pokemons;
        this.currentPage = 0;
        this.updateDisplayedPokemons();
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  get filteredPokemons(): Pokemon[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.allPokemons.filter(pokemon => {
      const matchesName = pokemon.name.toLowerCase().includes(term);
      const matchesId = pokemon.id.toString().includes(term);
      const matchesType = this.selectedTypes.length === 0 || this.selectedTypes.some(t => pokemon.type.includes(t));
      return (matchesName || matchesId) && matchesType;
    });
  }

  updateDisplayedPokemons(): void {
    const startIndex = this.currentPage * this.limit;
    const endIndex = startIndex + this.limit;
    this.displayedPokemons = this.filteredPokemons.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredPokemons.length / this.limit);
    this.pages = this.calculatePages();
  }

  calculatePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (this.totalPages <= maxButtons) {
      for (let i = 0; i < this.totalPages; i++) pages.push(i);
    } else {
      const first = 0;
      const last = this.totalPages - 1;
      let start = Math.max(this.currentPage - 1, 1);
      let end = Math.min(this.currentPage + 1, last - 1);

      if (start > 1) pages.push(first, '...');
      else pages.push(first);

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < last - 1) pages.push('...', last);
      else if (end === last - 1) pages.push(last);
    }

    return pages;
  }

  goToPage(page: number | string): void {
    if (typeof page !== 'number') return;

    this.loading = true;

    setTimeout(() => {
      this.currentPage = page;
      this.updateDisplayedPokemons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.loading = false;
    }, 300);
  }

  onSearchTermChange(): void {
    this.loading = true;
    setTimeout(() => {
      this.currentPage = 0;
      this.updateDisplayedPokemons();
      this.loading = false;
    }, 300);
  }

  selectPokemon(id: number): void {
    this.loading = true;

    setTimeout(() => {
      this.selectedPokemonId = id;
      this.closingCard = false;
      this.loading = false;
    }, 150);
  }

  selectEvolutionPokemon(evoId: number) {
    if (!evoId) return;

    this.loading = true;
    this.closingCard = true;

    setTimeout(() => {
      this.selectedPokemonId = evoId;
      this.closingCard = false;

      setTimeout(() => {
        if (this.detailsCard) {
          this.detailsCard.nativeElement.scrollTop = 0;
        }
        this.loading = false;
      }, 50);
    }, 300);
  }

  toggleTypeSelection(type: string): void {
    this.loading = true;

    setTimeout(() => {
      if (this.selectedTypes.includes(type))
        this.selectedTypes = this.selectedTypes.filter(t => t !== type);
      else this.selectedTypes.push(type);

      this.currentPage = 0;
      this.updateDisplayedPokemons();
      this.loading = false;
    }, 150);
  }

  resetAdvancedSearch(): void {
    this.loading = true;

    setTimeout(() => {
      this.selectedTypes = [];
      this.advancedSearch = { ability: '', move: '', region: '' };
      this.searchTerm = '';
      this.showAdvancedSearch = false;
      this.loadAllPokemons();
      this.loading = false;
    }, 300);
  }

  applyAdvancedSearch(): void {
    this.loading = true;
    this.currentPage = 0;

    const filters = {
      name: this.searchTerm.trim() || undefined,
      types: this.selectedTypes.length > 0 ? this.selectedTypes : undefined,
      ability: this.advancedSearch.ability.trim() || undefined,
      move: this.advancedSearch.move.trim() || undefined,
      generation: this.advancedSearch.region ? this.regionToGenerationMap[this.advancedSearch.region] : undefined,
    };

    this.pokemonService.searchAdvancedPokemons(filters).subscribe(
      (pokemons: Pokemon[]) => {
        this.allPokemons = pokemons;
        this.updateDisplayedPokemons();
        this.loading = false;
      },
      () => (this.loading = false)
    );

    this.showAdvancedSearch = false;
  }

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

  trackPokemon(index: number, pokemon: Pokemon): number {
    return pokemon.id;
  }
}
