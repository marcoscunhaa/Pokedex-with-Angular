
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'pokemon-details/:id', 
    component: PokemonDetailsComponent 
  },
];
