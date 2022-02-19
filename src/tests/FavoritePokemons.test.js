import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

function addToFavorite(pokemon) {
  const regexFindPokemon = new RegExp(pokemon, 'i');
  const pokemonEl = screen.getByText(regexFindPokemon);
  expect(pokemonEl).toBeInTheDocument();

  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsLink);

  const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(checkbox);
  const linkHome = screen.getByRole('link', { name: /home/i });
  userEvent.click(linkHome);
}

describe('Teste do componente <FavoritePokemons.js />', () => {
  test('Verifica se é exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const textNoPokemonFound = screen.getByText(/no favorite pokemon found/i);
    expect(textNoPokemonFound).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    addToFavorite('pikachu');

    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);

    addToFavorite('snorlax');

    const link = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(link);
    const pikachu = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    const snorlax = screen
      .getByRole('img', { name: /snorlax is marked as favorite/i });

    expect(pikachu && snorlax).toBeInTheDocument();
  });
});
