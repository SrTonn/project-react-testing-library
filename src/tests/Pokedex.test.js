import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const pokemonList = [
  'Pikachu',
  'Charmander',
  'Caterpie',
  'Ekans',
  'Alakazam',
  'Mew',
  'Rapidash',
  'Snorlax',
  'Dragonair',
];
const buttonTypeList = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

function checkPokemonAndClickInButtonNext(pokemon) {
  const regexFindPokemon = new RegExp(pokemon, 'i');
  const pokemonEl = screen.getByText(regexFindPokemon);
  const buttonNext = screen
    .getByRole('button', { name: /próximo pokémon/i });
  expect(pokemonEl && buttonNext).toBeInTheDocument();
  userEvent.click(buttonNext);
}

function checkFilterButton(typeFilterButton) {
  const regexFindButton = new RegExp(typeFilterButton, 'i');
  const button = screen.getByRole('button', { name: regexFindButton });
  expect(button).toBeInTheDocument();
}

describe('Teste do componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Verifica se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      const textInHome = screen
        .getByRole('heading', { name: /Encountered pok(e|é)mons/i, level: 2 });
      expect(textInHome).toBeInTheDocument();
    });

  test('Verifica se é exibido o próximo Pokémon da lista quando'
  + ' o botão Próximo pokémon é clicado.', () => {
    pokemonList.forEach((pokemon) => checkPokemonAndClickInButtonNext(pokemon));
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Verifica se a Pokédex tem os botões de filtro.', () => {
    buttonTypeList.forEach((button) => checkFilterButton(button));
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    const NUMBER_OF_TYPES = 7;
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsType.length).toBe(NUMBER_OF_TYPES);
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: /All/ });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(buttonNext.disabled).toBe(false);
  });
});
