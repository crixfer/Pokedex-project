//INTERFACE

export interface Pokemon {
  name: string;
  id: number;
  height: number; // Added height
  weight: number; // Added weight

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
  //stats // Added stats
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  //information
  description: string;
  routes: string;
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
  other?: {
    // <— agrega esto
    'official-artwork'?: {
      front_default: string;
    };
    dream_world?: {
      front_default: string;
    };
  };
}
