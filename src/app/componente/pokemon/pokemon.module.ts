import { CompartilhadoModule } from './../../compartilhado/compartilhado.module';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { PokemonService } from './../../servico/pokemon.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPokemonComponent } from './lista-pokemon/lista-pokemon.component';
import { DetalhePokemonComponent } from './detalhe-pokemon/detalhe-pokemon.component';
import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PokemonRoutingModule,
    CompartilhadoModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#0679f9',
    })
  ],
  declarations: [
    ListaPokemonComponent,
    DetalhePokemonComponent,
  ],
  providers: [
    PokemonService
  ]
})
export class PokemonModule { }
