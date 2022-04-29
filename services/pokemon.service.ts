const apiUrl = 'https://pokeapi.co/api/v2';

export const getPokemon = async () => {
  const res = await fetch(`${apiUrl}/pokemon?limit=2000`);
  const data = await res.json();

  console.log(data);

  return data;
};
