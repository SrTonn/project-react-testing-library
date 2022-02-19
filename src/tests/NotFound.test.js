import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste do componente <NotFound.js />', () => {
  test('Verifica se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<App />, { route: '/something-that-does-not-match' });

      const notFoundText = screen.getByRole('heading',
        { name: /Page requested not found Crying emoji/i, level: 2 });
      expect(notFoundText).toBeInTheDocument();
    });

  test('Verifica se página mostra a imagem', () => {
    renderWithRouter(<App />, { route: '/something-that-does-not-match' });

    const notFoundImg = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
