import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste do componente <About.js />.', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('Verifica se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const textInAbout = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(textInAbout).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const phraseOnePartOne = screen.getByText(/This application simulates a Pokédex,/i);
    const phraseOnePartTwo = screen
      .getByText(/a digital encyclopedia containing all Pokémons/i);
    expect(phraseOnePartOne && phraseOnePartTwo).toBeInTheDocument();

    const phraseTwoPartOne = screen.getByText(/One can filter Pokémons by type,/i);
    const phraseTwoPartTwo = screen
      .getByText(/and see more details for each one of them/i);
    expect(phraseTwoPartOne && phraseTwoPartTwo).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText(/Pokédex/i);
    expect(img.src === srcImg).toBe(true);
  });
});
