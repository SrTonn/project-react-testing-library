import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      const linkHome = screen.getByRole('link', { name: /home/i });
      const linkAbout = screen.getByRole('link', { name: /About/i });
      const linkFavoritePokemons = screen
        .getByRole('link', { name: /Favorite Pok(e|é)mons/i });
      expect(linkHome && linkAbout && linkFavoritePokemons).toBeInTheDocument();
    });

  test('Verifica se a aplicação é redirecionada para a página inicial,'
  + ' na URL / ao clicar no link Home da barra de navegação', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);

    const textInHome = screen
      .getByRole('heading', { name: /Encountered pok(e|é)mons/i, level: 2 });
    expect(textInHome).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página de About, '
   + 'na URL /about, ao clicar no link About da barra de navegação.', () => {
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const textInHome = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(textInHome).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found ao entrar'
  + ' em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/something-that-does-not-match' });

    const textInHome = screen
      .getByRole('heading', { name: /Page requested not found Crying emoji/i, level: 2 });
    expect(textInHome).toBeInTheDocument();
  });
});
