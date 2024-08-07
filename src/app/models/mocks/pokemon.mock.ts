import { IPokemon } from "../pokemon.model"; // Import your schemas

export const pokemonMockData: IPokemon = {
  id: 1,
  name: "Mockémon",
  sprite: "https://example.com/mockemon.png",
  abilities: [
    {
      ability: {
        name: "Mock Ability",
        url: "https://example.com/mock-ability",
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "normal",
        url: "https://example.com/mock-type",
      },
    },
  ],
};
