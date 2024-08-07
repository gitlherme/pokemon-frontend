import { PokemonCard } from "@/components/pokemon-card";
import SearchBar from "@/components/search-bar";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center justify-center">
        <SearchBar />
        <PokemonCard />
      </div>
    </HydrationBoundary>
  );
}
