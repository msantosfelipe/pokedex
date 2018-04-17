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
    sprites: {
        front_default: string;
        back_default: string;
    };
    types: [
        {
            type: {
                name: string;
            }
        }
    ];
    stats: [
        {
            stat: {
                name: string
            }
        }
    ];
}
