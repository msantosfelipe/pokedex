import { MaiusculoPipe } from './../../../compartilhado/pipe/maiusculo.pipe';
import { ToastyService } from 'ng2-toasty';
import { PokemonService } from './../../../servico/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.componente';
import { Pokemon } from '../../../model/pokemon.model';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.scss']
})
export class ListaPokemonComponent extends BaseComponent implements OnInit {

  public pokemons: Pokemon[];
  public total: number;
  private maiusculoPipe = new MaiusculoPipe();
  public exibirTabela = false;
  public progress: number;
  public textoProgress: string;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private dialogo: ToastyService
  ) {
    super();
  }

  ngOnInit() {
    this.pokemons = new Array<Pokemon>();
    this.listarPokemons();
  }

  /** Chama serviço que lista todos os Pokemons com paginação */
  listarPokemons() {
    this.exibirLoading();
    this.progress = 0;
    this.textoProgress = 'Carregando...';
    this.pokemonService.listarPokemons(this.paginacao).subscribe((response: any) => {
      this.paginacao = this.getPaginacao(this.paginacao, response);
      if (response && response.count > 0) {
        this.total = response.count;
        this.exibirTabela = true;
        this.pokemons = new Array<Pokemon>();
        response.results.forEach(pokemon => {
          this.pokemons.push(pokemon as Pokemon);
          this.progress = 40;
        });
        this.chamarDetalhes(response.results);
      }
    }, ((erro) => {
      this.esconderLoading();
      this.dialogo.error('Ocorreu um erro');
    }));
  }

  /** Chama detalhes dos pokemons da paginação atual */
  chamarDetalhes(listaPokemons) {
    const listaRequisicoes = [];
    listaPokemons.forEach((item, index) => {
      listaRequisicoes.push(
        this.pokemonService.buscarDetalhePokemon(listaPokemons[index].name));
    });
    this.progress = 60;
    /** Desenvolvi da forma de lazy loading
     * Primeiro carregou a lista com os nomes dos pokemons
     * agora irá buscar os detalhes dos pokemons e exibe
     * as imagens e os tipos */
    forkJoin(listaRequisicoes).subscribe(response => {
      this.progress = 100;
      this.textoProgress = 'Concluído';
      response.forEach(item => {
        this.pokemons.forEach(pokemon => {
          const pokemonDetalhe = item as Pokemon;
          if (pokemonDetalhe.name === pokemon.name) {
            pokemon.sprites = pokemonDetalhe.sprites;
            pokemon.types = pokemonDetalhe.types;
          }
        });
      });
    }, (e) => {
      this.dialogo.error('Ocorreu um erro');
    }, () => this.esconderLoading());

  }

  /** Pagina a tabela */
  public pageChanged(event: any): void {
    this.paginacao.pagina = event.page;
    this.listarPokemons();
  }

  /** Redireciona para página de detalhe */
  selecionar(pokemon: Pokemon) {
    this.router.navigate([`/pokemon/${pokemon.name}`]);
  }

  /** Retorna o texto com os tipos do Pokemon formatado */
  tipoPokemon(tipos) {
    let retorno = '';
    tipos.forEach((element, index) => {
      retorno = retorno.concat(
        this.maiusculoPipe.transform(element.type.name));
      if (index !== tipos.length - 1) {
        retorno = retorno.concat(', ');
      }
    });

    return retorno;
  }

}
