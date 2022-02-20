import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import pokemonList from '../data';

const snorlax = pokemonList[7];
describe('Teste do componente <Pokemon.js />', () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    renderWithRouter(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const typeNormal = screen.queryByRole('button', { name: /normal/i });
    if (typeNormal) userEvent.click(typeNormal);
  });

  test('Verifica se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const snorlaxName = screen.getByText(snorlax.name);
      const snorlaxType = screen.queryByTestId('pokemon-type');
      const textNormalInScren = screen.getAllByText('Normal');
      const snorlaxWeight = screen.getByText(
        `Average weight: ${snorlax.averageWeight.value} kg`,
      );
      const snorlaxImg = screen.getByAltText(`${snorlax.name} sprite`);
      expect(
        snorlaxName
        && snorlaxType
        && snorlaxWeight
        && snorlaxImg,
      ).toBeInTheDocument();
      expect(textNormalInScren).toHaveLength(2);
      expect(snorlaxImg.src).toBe(snorlax.image);
    });

  test('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação'
  + ' para exibir detalhes deste Pokémon.', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/143');
  });

  it('Verifica se ao clicar no link de navegação do Pokémon, é feito'
   + ' o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const { location } = history;
    expect(location.pathname).toBe('/pokemons/143');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    const favoriteStar = screen
      .getByRole('img', { name: /snorlax is marked as favorite/i });
    expect(favoriteStar.src).toContain('/star-icon.svg');
  });
});
