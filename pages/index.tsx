import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { getPokemon, Pokemon } from '../queries/pokemon.query';

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const PokemonCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
  justify-content: center;

  width: 100%;
`;

const PokemonCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  width: 200px;
  height: 200px;
  box-sizing: border-box;

  border-radius: 20px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: #d6e1fe;
  }
`;

const PokemonCardTitle = styled.div`
  width: 100%;
  font-size: 12px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

interface Props {
  data: Pokemon[];
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Root>
      <h1>Pokemon</h1>
      <PokemonCardContainer>
        {data.map(({ id, name, image }) => (
          <PokemonCard key={id}>
            <PokemonCardTitle>{`#${id} ${name}`}</PokemonCardTitle>
            <Image src={image} alt={name} width={100} height={100} />
          </PokemonCard>
        ))}
      </PokemonCardContainer>
    </Root>
  );
};

export async function getServerSideProps() {
  const data = await getPokemon();

  return { props: { data } };
}

export default Home;
