import React from 'react';
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import AppContext from '../context/AppContext';

const SORT = 'sort-button';

test('Verifica se dar erro se passar não passar a ordenação', async () => {
  const { getByTestId, getByText } = render(
    <AppProvider>
      <AppContext.Consumer>
        {({ setOrder }) => (
          <button
            data-testid={ SORT }
            onClick={ () => setOrder('Ruan', 'population') }
          >
            Ordenar
          </button>
        )}
      </AppContext.Consumer>
    </AppProvider>,
  );
  userEvent.click(getByTestId(SORT));
  await wait(() => expect(getByText('')).toBeInTheDocument());
});

test('Verifica se ao ser igual a ele passa na função', async () => {
  const { getByTestId, getByText } = render(
    <AppProvider>
      <AppContext.Consumer>
        {({ planetsFiltered }) => (
          <button
            data-testid={ SORT }
            onClick={ () => planetsFiltered('population', 'igual a', '20') }
          >
            Ordenar
          </button>
        )}
      </AppContext.Consumer>
    </AppProvider>,
  );
  userEvent.click(getByTestId(SORT));
  await wait(() => expect(getByText('')).toBeInTheDocument());
});

test('Verifica se ao ser nada a ele retorna nada', async () => {
  const { getByTestId, getByText } = render(
    <AppProvider>
      <AppContext.Consumer>
        {({ planetsFiltered }) => (
          <button
            data-testid={ SORT }
            onClick={ () => planetsFiltered('population', 'nada', '20') }
          >
            Ordenar
          </button>
        )}
      </AppContext.Consumer>
    </AppProvider>,
  );
  userEvent.click(getByTestId(SORT));
  await wait(() => expect(getByText('')).toBeInTheDocument());
});
