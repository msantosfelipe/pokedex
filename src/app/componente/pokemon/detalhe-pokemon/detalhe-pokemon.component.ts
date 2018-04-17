import { Pokemon } from './../../../model/pokemon.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from './../../../servico/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.componente';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss']
})
export class DetalhePokemonComponent extends BaseComponent implements OnInit {
  public id: number;
  public pokemon: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogo: ToastyService
  ) {
    super();
  }

  ngOnInit() {
    this.carregarTela();
  }

  carregarTela() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.buscarDetalhePokemon();
      }
    });
  }

  buscarDetalhePokemon() {
    this.exibirLoading();
    this.pokemonService.buscarDetalhePokemon(this.id).subscribe(res => {
      this.pokemon = res as Pokemon;
      this.esconderLoading();
    }, (err => {
      this.esconderLoading();
      this.dialogo.error('Ocorreu um erro');
    }));
  }

  voltar() {
    this.router.navigate([``]);
  }

}
