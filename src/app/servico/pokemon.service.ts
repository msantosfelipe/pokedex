import { Paginacao } from './../model/paginacao.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  /** Lista Pokemons com paginação */
  listarPokemons(paginacao: Paginacao) {
    const param = new HttpParams()
      .append('limit', `${environment.limitPaginacao}`)
      .append('offset', this.getOffset(paginacao.pagina).toString());

    return this.http.get(`${environment.api}/pokemon`, { params: param });
  }

  /** Busca detalhe de um Pokemon pelo nome */
  buscarDetalhePokemon(nome: string) {
    return this.http.get(`${environment.api}/pokemon/${nome}`);
  }

  /** Busca o offset de acordo com a página */
  private getOffset(pagina: number) {
    if (pagina !== 1) {
      return pagina * 10 - 10;
    }
    return 0;
  }

}
