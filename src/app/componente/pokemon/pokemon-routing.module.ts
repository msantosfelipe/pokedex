import { DetalhePokemonComponent } from './detalhe-pokemon/detalhe-pokemon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pokemon/:nome', component: DetalhePokemonComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PokemonRoutingModule {}
