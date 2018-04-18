import { TipoPokemon } from './tipo-pokemon.model';
import { SpritesPokemon } from './sprites-pokemon.model';

export class Pokemon {
    height: string;
    weight: string;
    name: string;
    url: string;
    abilities: [
        {
            ability: {
                name: string
            }
        }
    ];
    sprites: SpritesPokemon;
    types: TipoPokemon[];
    stats: [
        {
            stat: {
                name: string
            }
        }
    ];

    constructor() {
        this.sprites = new SpritesPokemon();
        this.types = new Array<TipoPokemon>();
    }
}
