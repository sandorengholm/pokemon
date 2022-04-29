import { gql } from '@apollo/client';
import apolloClient from '../apollo-client';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface RawPokemon {
  id: number;
  pokemon_v2_pokemonspecy: {
    name: string;
  };
}

interface PokemonQuery {
  pokemon_v2_pokemon: RawPokemon[];
}

export const PokemonQuery = gql`
  query PokemonQuery {
    pokemon_v2_pokemon {
      id
      pokemon_v2_pokemonspecy {
        name
      }
    }
  }
`;

export const getPokemon = async () => {
  const { data } = await apolloClient.query<PokemonQuery>({
    query: PokemonQuery,
  });

  const modifiedData: Pokemon[] = data.pokemon_v2_pokemon.map((pokemon) => ({
    ...pokemon,
    name: pokemon.pokemon_v2_pokemonspecy.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
  }));

  return modifiedData;
};
