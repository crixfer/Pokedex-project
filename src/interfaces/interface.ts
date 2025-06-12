//INTERFACE

export interface Pokemon {
  name: string;
  id: number;
  //image
  sprites: {
    front_default: string;
  };
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
