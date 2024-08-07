"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { Form, FormControl, FormField, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useGetPokemonData } from "@/app/queries/get-pokemon-data";
import Image from "next/image";
import pokeballSvg from "../../public/pokeball.svg";

const SearchPokemonFormSchema = z.object({
  name: z.string().min(2, {
    message: "The pokémon name needs to have at least 2 characters.",
  }),
});

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof SearchPokemonFormSchema>>({
    resolver: zodResolver(SearchPokemonFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const pokemonDataQuery = useGetPokemonData();

  const onSubmit = (data: any) => {
    router.push(pathname + "?pokemon=" + data.name);
    pokemonDataQuery.refetch();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="py-12 lg:py-16">
        <div className="text-center w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center items-center gap-4">
            <span className="block">Pokémon Ability</span>
            <Image src={pokeballSvg} width={72} height={72} alt="Pokeball" />
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Search for your favorite pokémon and see the power from it.
          </p>
          <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <div className="flex-[1_0_0%]">
                        <FormLabel>
                          <Label htmlFor="pokemon" className="sr-only">
                            Search pokémon
                          </Label>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-full"
                            id="pokemon"
                            placeholder="Pikachu"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                  <div className="flex-[0_0_auto]">
                    <Button
                      size={"icon"}
                      disabled={pokemonDataQuery.isFetching}
                    >
                      <SearchIcon />
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
