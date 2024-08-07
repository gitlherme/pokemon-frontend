import { describe, expect, it } from "@jest/globals";
import {
  capitalizePokemonName,
  normalizePokemonAbility,
  pokemonTypes,
} from "../pokemon.utils";

describe("pokemonTypes", () => {
  it('should return the correct type for "normal"', () => {
    expect(pokemonTypes["normal"]).toEqual({
      name: "Normal",
      badgeBackground: "#A8A77A",
      emojiIcon: "🐾",
    });
  });
});
describe("capitalizePokemonName", () => {
  it("should capitalize the first letter of a pokemon name", () => {
    expect(capitalizePokemonName("pikachu")).toBe("Pikachu");
    expect(capitalizePokemonName("charizard")).toBe("Charizard");
    expect(capitalizePokemonName("bulbasaur")).toBe("Bulbasaur");
  });

  it("should return an empty string if the input is empty", () => {
    expect(capitalizePokemonName("")).toBe("");
  });
});

describe("normalizePokemonAbility", () => {
  it("should remove special characters and convert to capital letters", () => {
    expect(normalizePokemonAbility("lightning-raid")).toBe("Lightning Raid");
  });

  it("should return an empty string if the input is empty", () => {
    expect(normalizePokemonAbility("")).toBe("");
  });
});
