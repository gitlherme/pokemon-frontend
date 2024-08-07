"use client";
import { useGetPokemonData } from "@/app/queries/get-pokemon-data";
import { GlareCard } from "./ui/glare-card";
import { Badge } from "./ui/badge";
import missingnoGif from "../../public/missingno.gif";
import {
  capitalizePokemonName,
  normalizePokemonAbility,
  pokemonTypes,
} from "@/app/utils/pokemon.utils";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const PokemonCardSkeleton = () => {
  return <Skeleton className="h-[472px] w-[320px] rounded-[48px]" />;
};

const PokemonNotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center my-16">
      <Image src={missingnoGif} alt="Missing no" />
      <span className="block">Oops! Pokémon not found!</span>
    </div>
  );
};

export function PokemonCard() {
  const { data: pokemon, isError, isLoading } = useGetPokemonData();

  if (isError) {
    return <PokemonNotFound />;
  }

  if (isLoading) {
    return <PokemonCardSkeleton />;
  }

  return (
    <>
      {pokemon?.id ? (
        <GlareCard className="flex flex-col py-8 px-6">
          <div>
            <Image
              src={pokemon.sprite}
              width={300}
              height={300}
              objectFit="contain"
              alt={pokemon.name}
            />
          </div>
          <div className="w-full flex justify-between">
            <p className="font-bold text-white text-lg uppercase">
              {pokemon?.name}
            </p>
            <div className="flex gap-1">
              {pokemon?.types.map((item) => (
                <Badge
                  key={item.slot}
                  variant={"secondary"}
                  style={{
                    backgroundColor:
                      pokemonTypes[item.type.name].badgeBackground,
                  }}
                >
                  {pokemonTypes[item.type.name].emojiIcon}
                  {pokemonTypes[item.type.name].name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="font-normal text-base text-neutral-200 mt-4">
            <span className="block my-2">
              There are the {capitalizePokemonName(pokemon.name)} abilities:
            </span>
            <div className="flex flex-wrap gap-2">
              {pokemon?.abilities.map((item) => (
                <Badge key={item.slot} className="bg-yellow-500/80">
                  {normalizePokemonAbility(item.ability.name)}
                </Badge>
              ))}
            </div>
          </div>
        </GlareCard>
      ) : (
        ""
      )}
    </>
  );
}
