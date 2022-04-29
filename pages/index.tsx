import { gql } from '@apollo/client';
import type { NextPage } from 'next';
import styled from 'styled-components';
import client from '../apollo-client';

const Root = styled.div`
  display: flex;
`;

const Home: NextPage = ({ data }) => {
  return (
    <Root>
      <h1>Pokemon</h1>
      <ul>
        {data.pokemon_v2_pokemon.map(({ pokemon }) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </Root>
  );
};

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Pokemon {
        pokemon_v2_pokemon {
          id
          name
        }
      }
    `,
  });

  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
