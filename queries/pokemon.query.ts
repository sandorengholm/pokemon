import { gql } from '@apollo/client';
import apolloClient from '../apollo-client';

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
}

export interface RawPokemon {
  id: number;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
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
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
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
    id: pokemon.id,
    name: pokemon.pokemon_v2_pokemonspecy.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
    types: pokemon.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.name as PokemonType
    ),
  }));

  return modifiedData;
};
