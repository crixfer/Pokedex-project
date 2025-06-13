//INTERFACE

export interface Pokemon {
  name: string;
  id: number;

  //image
  sprites: PokemonSprites;
  //type
  types?: {
    type: {
      name: string;
    };
  }[];
  //abilities
  abilities: {
    ability: {
      name: string;
    };
  }[];
  //information
  description: string;
}

export interface PokemonSprites {
  front_default: string;
  versions?: {
    'generation-v': {
      'black-white': {
        animated: {
          front_default: string;
        };
      };
    };
    // Si quieres otras generaciones, añádelas aquí
  };
}
