import { ToastyService } from 'ng2-toasty';
import { PokemonService } from './../../../servico/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.componente';
import { Pokemon } from '../../../model/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrls: ['./lista-pokemon.component.scss']
})
export class ListaPokemonComponent extends BaseComponent implements OnInit {

  public pokemons: Pokemon[];
  public total: number;

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
        this.pokemons = new Array<Pokemon>();
        response.results.forEach(pokemon => {
          this.pokemons.push(pokemon);
        });
      }
    }, ((erro) => {
      this.dialogo.error('Ocorreu um erro');
    }), () => this.esconderLoading());
  }

  /** Pagina a tabela */
  public pageChanged(event: any): void {
    this.paginacao.pagina = event.page;
    this.listarPokemons();
  }

  /** Redireciona para página de detalhe */
  selecionar(pokemon: Pokemon) {
    this.router.navigate([`/pokemon/${this.getId(pokemon.url)}`]);
  }

  /** Extrai o id do Pokemon */
  getId(url: string) {
    return url.split('pokemon/')[1].split('/')[0];
  }

}
