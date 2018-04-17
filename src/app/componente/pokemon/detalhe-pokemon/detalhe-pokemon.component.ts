import { Pokemon } from './../../../model/pokemon.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from './../../../servico/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.componente';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
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

  /** Carrega o id do pokemon */
  carregarTela() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.buscarDetalhePokemon();
      }
    });
  }

  /** Chama o serviço de buscar detalhe do Pokemon */
  buscarDetalhePokemon() {
    this.exibirLoading();
    this.pokemonService.buscarDetalhePokemon(this.id).subscribe(res => {
      this.pokemon = res as Pokemon;
    }, ((erro) => {
      this.dialogo.error('Ocorreu um erro');
    }), () => this.esconderLoading());
  }

  /** Volta para tela de Home */
  voltar() {
    this.router.navigate([``]);
  }

}
