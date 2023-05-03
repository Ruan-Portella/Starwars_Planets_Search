import React, { useContext } from 'react';
import Table from '../components/Table';
import AppContext from '../context/AppContext';

function Form() {
  const { inputText, setInputText,
    columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter,
    numberFilter, setNumberFilter,
    buttonFilter, columnOptions,
    filters, removeFilters,
    setFilters, setColumnOptions,
    columnSort, setColumnSort,
    setSort, Sort, setOrder, sortOptions } = useContext(AppContext);

  return (
    <div>
      <form className="form">
        <input
          data-testid="name-filter"
          type="text"
          value={ inputText }
          placeholder="Pesquisar Personagem"
          onChange={ ({ target }) => setInputText(target.value) }
        />
        <select
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          {columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ numberFilter }
          onChange={ ({ target }) => setNumberFilter(target.value) }
        />
        <button data-testid="button-filter" type="button" onClick={ buttonFilter }>
          Filtrar
        </button>
        <select
          data-testid="column-sort"
          value={ columnSort }
          onChange={ ({ target }) => setColumnSort(target.value) }
        >
          {sortOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
        <input
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ () => setSort('ASC') }
        />
        Ascendente
        <input
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ () => setSort('DESC') }
        />
        Descendente
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setOrder(Sort, columnSort) }
        >
          Ordenar
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            setFilters([]);
            setColumnOptions(['population', 'orbital_period',
              'diameter', 'rotation_period', 'surface_water']);
          } }
        >
          Remover Filtros
        </button>
        <ul>
          {
            filters.map((filter, index) => (
              <li key={ index } data-testid="filter">
                <span>{filter.column}</span>
                <span>{filter.comparison}</span>
                <span>{filter.number}</span>
                <button
                  data-testid="buttonRemove-form"
                  type="button"
                  onClick={ () => removeFilters(filter.column) }
                >
                  X
                </button>
              </li>
            ))
          }
        </ul>
      </form>
      <Table />
    </div>
  );
}

export default Form;
