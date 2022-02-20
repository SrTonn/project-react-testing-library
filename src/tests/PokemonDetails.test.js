import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const paragraph = new RegExp(
  'this intelligent pokémon roasts hard berries '
  + 'with electricity to make them tender enough to eat.',
  'i',
);

describe('Teste do componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
  });

  test('Verifica se as informações detalhadas do Pokémon selecionado'
  + ' são mostradas na tela.', () => {
    const linkMoreDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkMoreDetails).not.toBeInTheDocument();

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const summary = screen.getByRole('heading', { name: /summary/i });
    const paragraphEl = screen.getByText(paragraph);

    expect(pokemonDetails && summary && paragraphEl).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção'
  + ' com os mapas contendo as localizações do pokémon', () => {
    const gameLocationTitle = screen
      .getByRole('heading', { name: /game locations of pikachu/i });
    const locationOne = screen.getByText(/kanto viridian forest/i);
    const locationTwo = screen.getByText(/kanto power plant/i);
    expect(gameLocationTitle && locationOne && locationTwo).toBeInTheDocument();

    const imgLocationOne = screen.getAllByRole('img', { name: /Pikachu location/i })[0];
    const imgLocationTwo = screen.getAllByRole('img', { name: /Pikachu location/i })[1];
    expect(imgLocationOne && imgLocationTwo);

    expect(/kanto/i.test(imgLocationOne.src)).toBe(true);
  });

  test('Verifica se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const checkbox = screen
        .getByRole('checkbox', { name: /pokémon favoritado\?/i });
      expect(checkbox).toBeInTheDocument();
      userEvent.click(checkbox);

      const isFavorited = screen
        .getByRole('img', { name: /pikachu is marked as favorite/i });
      expect(isFavorited).toBeInTheDocument();

      userEvent.click(checkbox);
      const isNotFavorited = screen
        .queryByRole('img', { name: /pikachu is marked as favorite/i });
      expect(isNotFavorited).not.toBeInTheDocument();
    });
});
