export const pokemonTypes: Record<
  string,
  { name: string; badgeBackground: string; emojiIcon: string }
> = {
  normal: { name: "Normal", badgeBackground: "#A8A77A", emojiIcon: "🐾" },
  fire: { name: "Fire", badgeBackground: "#EE8130", emojiIcon: "🔥" },
  fighting: { name: "Fighting", badgeBackground: "#C22E28", emojiIcon: "🥊" },
  water: { name: "Water", badgeBackground: "#6390F0", emojiIcon: "💧" },
  flying: { name: "Flying", badgeBackground: "#A98FF3", emojiIcon: "🕊️" },
  grass: { name: "Grass", badgeBackground: "#7AC74C", emojiIcon: "🌿" },
  poison: { name: "Poison", badgeBackground: "#A33EA1", emojiIcon: "💀" },
  electric: { name: "Electric", badgeBackground: "#F7D02C", emojiIcon: "⚡" },
  ground: { name: "Ground", badgeBackground: "#E2BF65", emojiIcon: "⛰️" },
  psychic: { name: "Psychic", badgeBackground: "#F95587", emojiIcon: "🧠" },
  rock: { name: "Rock", badgeBackground: "#B6A136", emojiIcon: "🪨" },
  ice: { name: "Ice", badgeBackground: "#96D9D6", emojiIcon: "❄️" },
  bug: { name: "Bug", badgeBackground: "#A6B91A", emojiIcon: "🐛" },
  dragon: { name: "Dragon", badgeBackground: "#6F35FC", emojiIcon: "🐉" },
  ghost: { name: "Ghost", badgeBackground: "#735797", emojiIcon: "👻" },
  dark: { name: "Dark", badgeBackground: "#705746", emojiIcon: "🌑" },
  steel: { name: "Steel", badgeBackground: "#B7B7CE", emojiIcon: "⚙️" },
  fairy: { name: "Fairy", badgeBackground: "#D685AD", emojiIcon: "🧚" },
  stellar: { name: "Stellar", badgeBackground: "#7B68EE", emojiIcon: "✨" },
};

export const capitalizePokemonName = (name: string): string => {
  const firstLetter = name.charAt(0).toUpperCase();
  const restOfName = name.slice(1);

  return firstLetter + restOfName;
};

export const normalizePokemonAbility = (ability: string): string => {
  const words = ability.split(/[\s-]/);

  const normalized = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return normalized;
};
