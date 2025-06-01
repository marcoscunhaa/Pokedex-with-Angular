import { Component, Input, OnChanges } from '@angular/core';
import { Pokemon, PokemonService } from '../../services/pokemon.service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  imports: [CommonModule],
})
export class PokemonDetailsComponent implements OnChanges {
  @Input() pokemonId!: number;
  pokemon!: Pokemon;
  evolutionSprites: { name: string; spriteBase64: string }[] = [];
  abilities: string[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnChanges(): void {
    if (this.pokemonId) {
      this.pokemonService.getPokemonById(this.pokemonId).subscribe({
        next: (data) => {
          this.pokemon = data;

          if (this.pokemon.ability && Array.isArray(this.pokemon.ability)) {
            this.abilities = this.pokemon.ability.map(a => a.trim());
          } else {
            this.abilities = [];
          }

          this.loadEvolutionSprites();
        },
        error: (err) => console.error('Erro ao buscar Pokémon:', err)
      });
    }
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

  statKeys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  getStatArray(): { name: string; value: number }[] {
    return Object.entries(this.pokemon.stats).map(([name, value]) => ({
      name,
      value: value as number
    }));
  }

  getStatWidth(value: number): string {
    const percent = Math.min(100, (value / 150) * 100); // Máximo de base stat
    return `${percent}%`;
  }

  getStatColor(stat: string): string {
    switch (stat) {
      case 'hp': return '#fca5a5'; 
      case 'attack': return '#fdba74';
      case 'defense': return '#93c5fd';
      case 'special-attack': return '#d8b4fe';
      case 'special-defense': return '#6ee7b7'; 
      case 'speed': return '#fde68a';           
      default: return '#d1d5db';                 
    }
  }

  loadEvolutionSprites() {
    this.evolutionSprites = [];

    if (!this.pokemon.evolution) return;

    for (const name of this.pokemon.evolution) {
      this.pokemonService.getPokemonsByName(name).subscribe({
        next: (pokes) => {
          const poke = pokes[0];
          if (poke) {
            this.evolutionSprites.push({
              name: poke.name,
              spriteBase64: poke.spriteBase64,
            });

            this.evolutionSprites.sort((a, b) =>
              this.pokemon.evolution.indexOf(a.name) - this.pokemon.evolution.indexOf(b.name)
            );
          }
        },
        error: (err) => console.error(`Erro ao buscar sprite de ${name}:`, err)
      });
    }
  }

  showAllMoves = false;

  getVisibleMoves(): string[] {
    return this.showAllMoves ? this.pokemon.move : this.pokemon.move.slice(0, 6);
  }

}
