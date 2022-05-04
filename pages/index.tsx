import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { getPokemon, Pokemon, PokemonType } from '../queries/pokemon.query';
import { lighten } from 'polished';

const TypeColorMap = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  unknown: '#FFFFFF',
  shadow: '#000000',
};

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

const PokemonCard = styled.div<{ type: PokemonType }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  width: 200px;
  height: 200px;
  box-sizing: border-box;

  border-radius: 20px;
  background-color: ${({ type }) => TypeColorMap[type]};
  cursor: pointer;

  &:hover {
    background-color: ${({ type }) => lighten(0.1, TypeColorMap[type])};
  }
`;

const PokemonCardTitle = styled.div`
  padding: 5px;
  margin-bottom: 10px;

  color: white;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Props {
  data: Pokemon[];
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Root>
      <h1>Pokemon</h1>
      <PokemonCardContainer>
        {data.map(({ id, name, image, type }) => (
          <PokemonCard key={id} type={type}>
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
