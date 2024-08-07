"use client";
import { getQueryClient } from "@/components/utils/providers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { IPokemon } from "../models/pokemon.model";

export const getPokemonData = async (name: string) => {
  const response = await fetch(`http://localhost:3000/pokemons/${name}`);
  if (response.status === 404) {
    throw new Error("Pokémon not found");
  }
  return await response.json();
};

export const useGetPokemonData = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("pokemon");

  return useQuery<IPokemon, Error, IPokemon>({
    queryKey: ["pokemon", name?.toLowerCase()],
    queryFn: () => getPokemonData(String(name).toLowerCase()),
    initialData: getQueryClient().getQueryData(["pokemon", name]),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!name,
    retry: false,
  });
};
