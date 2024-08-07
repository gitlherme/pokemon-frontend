import { render, screen } from "@testing-library/react";
import SearchBar from "../search-bar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("SearchBar", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });
    (usePathname as jest.Mock).mockReturnValue("");
  });
  test('renders "Pokémon Ability" title', () => {
    render(<SearchBar />, { wrapper });
    const title = screen.getByText("Pokémon Ability");
    expect(title).toBeInTheDocument();
  });
  test("renders search input", () => {
    render(<SearchBar />, { wrapper });
    const searchInput = screen.getByPlaceholderText("Pikachu");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders search button", () => {
    render(<SearchBar />, { wrapper });
    const searchButton = screen.getByLabelText("Search pokémon");
    expect(searchButton).toBeInTheDocument();
  });
});
