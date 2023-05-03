import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import AppProvider from '../context/AppProvider';
import App from '../App';

beforeEach(() => (
  global.fetch = jest.fn(async () => ({
    json: async () => testData,
  }))
));

describe('Test StarWars', () => {
  test('Testa se a Tabela é exibida', () => {
    render(<AppProvider><App /></AppProvider>);
    const inputText = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparasonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const columnSort = screen.getByTestId('column-sort');
    const inputSortAsc = screen.getByTestId('column-sort-input-asc');
    const inputSortDesc = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByTestId('column-sort-button');
    const buttonRemove = screen.getByTestId('button-remove-filters');
    expect(buttonRemove).toBeInTheDocument();
    expect(buttonSort).toBeInTheDocument();
    expect(columnSort).toBeDefined();
    expect(inputSortAsc).toBeDefined();
    expect(inputSortDesc).toBeDefined();
    expect(buttonFilter).toBeDefined();
    expect(valueFilter).toBeDefined();
    expect(comparasonFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
  });
  test('Verifica se ao pesquisar o filtro funciona', async () => {
    render(<AppProvider><App /></AppProvider>);
    const inputText = screen.getByTestId('name-filter');
    userEvent.type(inputText, 'Hoth');
    const filtered = await screen.findByRole('cell', { name: /hoth/i });
    expect(filtered).toBeInTheDocument();
  });

  test('Verifica se ao comparar o filtro funciona', async () => {
    const valueFiltered = 4900;
    render(<AppProvider><App /></AppProvider>);
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['diameter']);

    const comparasonFilter = screen.getByTestId('comparison-filter');
    userEvent.type(comparasonFilter, ['maior que']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, valueFiltered);

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const filtered = await screen.findByRole('cell', { name: /endor/i });
    expect(filtered).toBeInTheDocument();

    userEvent.clear(valueFilter);

    userEvent.selectOptions(columnFilter, ['population']);

    userEvent.type(comparasonFilter, ['menor que']);

    userEvent.type(valueFilter, valueFiltered);

    userEvent.click(buttonFilter);

    const filteredPopulation = await screen.findByRole('cell', { name: /yavin/i });
    expect(filteredPopulation).toBeInTheDocument();

    userEvent.clear(valueFilter);

    userEvent.selectOptions(columnFilter, ['orbital_period']);

    userEvent.type(comparasonFilter, ['igual a']);

    userEvent.type(valueFilter, valueFiltered);

    userEvent.click(buttonFilter);

    const filteredOrbital = await screen.findByRole('cell', { name: /yavin/i });
    expect(filteredOrbital).toBeInTheDocument();

    userEvent.clear(valueFilter);

    userEvent.selectOptions(columnFilter, ['rotation_period']);

    userEvent.type(comparasonFilter, ['menor que']);

    userEvent.type(valueFilter, valueFiltered);

    userEvent.click(buttonFilter);

    const filteredRotation = await screen.findByRole('cell', { name: /tat/i });
    expect(filteredRotation).toBeInTheDocument();

    userEvent.clear(valueFilter);

    userEvent.selectOptions(columnFilter, ['surface_water']);

    userEvent.type(comparasonFilter, ['menor que']);

    userEvent.type(valueFilter, valueFiltered);

    userEvent.click(buttonFilter);

    const filteredSurface = await screen.findByRole('cell', { name: /tat/i });
    expect(filteredSurface).toBeInTheDocument();
  });

  test('Verifica se ao ordenar  o filtro funciona', async () => {
    render(<AppProvider><App /></AppProvider>);
    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, ['surface_water']);

    const inputSortAsc = screen.getByTestId('column-sort-input-asc');

    userEvent.click(inputSortAsc);

    const buttonSort = screen.getByTestId('column-sort-button');
    userEvent.click(buttonSort);

    const filteredSurface = await screen.findByRole('cell', { name: /yavin/i });

    expect(filteredSurface).toBeInTheDocument();

    userEvent.selectOptions(columnSort, ['orbital_period']);

    const inputSortDesc = screen.getByTestId('column-sort-input-desc');

    userEvent.click(inputSortDesc);

    userEvent.click(buttonSort);

    const filteredOrbital = await screen.findByRole('cell', { name: /alderaan/i });

    expect(filteredOrbital).toBeInTheDocument();
  });

  test('Verifica se ao Remover os Filtros desaparecem', async () => {
    render(<AppProvider><App /></AppProvider>);
    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, ['surface_water']);

    const inputSortAsc = screen.getByTestId('column-sort-input-asc');

    userEvent.click(inputSortAsc);

    const buttonSort = screen.getByTestId('column-sort-button');
    userEvent.click(buttonSort);

    const filteredSurface = await screen.findByRole('cell', { name: /yavin/i });

    expect(filteredSurface).toBeInTheDocument();

    const buttonRemove = screen.getByTestId('button-remove-filters');

    userEvent.click(buttonRemove);

    const filteredRemove = await screen.findByRole('cell', { name: /tat/i });

    expect(filteredRemove);
  });

  test('Verifica se ao clicar no X o filtro remove maior que', async () => {
    const valueFiltered = 4900;
    render(<AppProvider><App /></AppProvider>);
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['diameter']);

    const comparasonFilter = screen.getByTestId('comparison-filter');
    userEvent.type(comparasonFilter, ['maior que']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, valueFiltered);

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const filtered = await screen.findByRole('cell', { name: /endor/i });
    expect(filtered).toBeInTheDocument();

    const filterMark = screen.getByTestId('filter');
    expect(filterMark.textContent)
      .toBe('diametermaior que0X');

    const button = screen.getByTestId('buttonRemove-form');
    userEvent.click(button);
    expect(filterMark).not.toBeInTheDocument();
  });

  test('Verifica se ao clicar no X o filtro remove menor que', async () => {
    const valueFiltered = 4900;
    render(<AppProvider><App /></AppProvider>);
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['diameter']);

    const comparasonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparasonFilter, ['menor que']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, valueFiltered);

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const filterMark = screen.getByTestId('filter');
    expect(filterMark.textContent)
      .toBe('diametermenor que0X');

    const button = screen.getByTestId('buttonRemove-form');
    userEvent.click(button);
    expect(filterMark).not.toBeInTheDocument();
  });

  test('Verifica se ao clicar no X o filtro remove igual a', async () => {
    const valueFiltered = 4900;
    render(<AppProvider><App /></AppProvider>);
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['diameter']);

    const comparasonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparasonFilter, ['igual a']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, valueFiltered);

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    const filterMark = screen.getByTestId('filter');
    expect(filterMark.textContent)
      .toBe('diameterigual a0X');

    const button = screen.getByTestId('buttonRemove-form');
    userEvent.click(button);
    expect(filterMark).not.toBeInTheDocument();
  });
});
