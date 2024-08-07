import { render, screen, waitFor } from "@testing-library/react";
import {
  normalizePokemonAbility,
  pokemonTypes,
} from "../../app/utils/pokemon.utils";
import { PokemonCard } from "../pokemon-card";
import { useRouter, useSearchParams } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { capitalizePokemonName } from "@/app/utils/pokemon.utils";
import { pokemonMockData } from "@/app/models/mocks/pokemon.mock";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock useQuery
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("PokemonCard", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(pokemonMockData.name),
    });
  });
  it("renders loading skeleton when data is loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    render(<PokemonCard />, { wrapper });

    const skeleton = screen.getByTestId("skeleton-pokemon");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders Pokemon not found component when there is an error", () => {
    // Mock useQuery to simulate error state
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });

    render(<PokemonCard />, { wrapper });

    // Assert that the PokemonNotFound component is rendered
    const missingnoImage = screen.getByAltText("Missing no");
    const notFoundMessage = screen.getByText("Oops! Pokémon not found!");
    expect(missingnoImage).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
  });

  it("renders Pokemon information correctly when data is available", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: pokemonMockData,
    });

    render(<PokemonCard />, { wrapper });

    await waitFor(() => {
      const pokemonName = screen.getByText(
        capitalizePokemonName(pokemonMockData.name)
      );
      expect(pokemonName).toBeInTheDocument();
    });
  });

  it("renders Pokemon types correctly when data is available", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: pokemonMockData,
    });
    render(<PokemonCard />, { wrapper });

    await waitFor(() => {
      const typeBadges = screen.getAllByTestId("badge-type");
      expect(typeBadges).toHaveLength(pokemonMockData.types.length);

      pokemonMockData.types.forEach((type, index) => {
        expect(typeBadges[index]).toHaveTextContent(
          `${pokemonTypes[type.type.name].emojiIcon} ${
            pokemonTypes[type.type.name].name
          }`
        );
        expect(typeBadges[index]).toHaveStyle(
          `background-color: ${pokemonTypes[type.type.name].badgeBackground}`
        );
      });
    });
  });

  it("renders Pokemon abilities correctly when data is available", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: pokemonMockData,
    });

    render(<PokemonCard />, { wrapper });

    await waitFor(() => {
      const abilityBadges = screen.getAllByTestId("badge-ability");
      expect(abilityBadges).toHaveLength(pokemonMockData.abilities.length);

      pokemonMockData.abilities.forEach((ability, index) => {
        expect(abilityBadges[index]).toHaveTextContent(
          normalizePokemonAbility(ability.ability.name)
        );
      });
    });
  });
});
