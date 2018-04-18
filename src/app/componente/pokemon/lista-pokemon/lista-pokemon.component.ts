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
    this.pokemonService.listarPokemons(this.paginacao).subscribe((response: any) => {
      this.paginacao = this.getPaginacao(this.paginacao, response);
      if (response && response.count > 0) {
        this.total = response.count;
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

    forkJoin(listaRequisicoes).subscribe(response => {
      this.pokemons = new Array<Pokemon>();
      response.forEach(pokemon => {
        this.pokemons.push(pokemon as Pokemon);
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
