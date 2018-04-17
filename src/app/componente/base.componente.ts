import { Paginacao } from './../model/paginacao.model';
export abstract class BaseComponent {

    public loading = false;
    public paginacao: Paginacao = new Paginacao();

    constructor() { }

    isNotEmpty(list: any[]): boolean {
        if (list && list.length > 0) {
            return true;
        }
        return false;
    }

    exibirLoading() {
        this.loading = true;
    }

    esconderLoading() {
        this.loading = false;
    }

    getPaginacao(paginacao: Paginacao, retorno): Paginacao {
        if (retorno.results != null) {
            paginacao.totalItens = retorno.count;
        }
        return paginacao;
    }

}
