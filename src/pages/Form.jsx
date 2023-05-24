import React, { useContext } from 'react';
import Table from '../components/Table';
import AppContext from '../context/AppContext';
import logoStarWars from '../images/logo-starwars.svg';
import '../styles/Form.css';

function Form() {
  const { inputText, setInputText,
    columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter,
    numberFilter, setNumberFilter,
    buttonFilter, columnOptions,
    filters, removeFilters,
    setFilters, setColumnOptions,
    columnSort, setColumnSort,
    setSort, Sort, setOrder, sortOptions,
    setSortOptions } = useContext(AppContext);

  return (
    <div className="MainContent">
      <div className="ImageContent">
        <img className="StarWars" src={ logoStarWars } alt="Star" />
      </div>
      <div className="FormContent">
        <input
          data-testid="name-filter"
          type="text"
          className="searchPlanet"
          value={ inputText }
          placeholder="Pesquisar Planeta"
          onChange={ ({ target }) => setInputText(target.value) }
        />
        <form className="formInputs">
          <select
            data-testid="column-filter"
            className="selectFilter"
            value={ columnFilter }
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            {columnOptions.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            className="comparasionFilter"
            value={ comparisonFilter }
            onChange={ ({ target }) => setComparisonFilter(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            className="valueFilter"
            type="number"
            data-testid="value-filter"
            value={ numberFilter }
            onChange={ ({ target }) => setNumberFilter(target.value) }
          />
          <button
            className="buttonFilter"
            data-testid="button-filter"
            type="button"
            onClick={ buttonFilter }
          >
            Filtrar
          </button>
          <select
            data-testid="column-sort"
            value={ columnSort }
            className="columnFilter"
            onChange={ ({ target }) => setColumnSort(target.value) }
          >
            {sortOptions.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
          <div name="radioFilter" onChange={ () => setSort('ASC') }>
            <input
              type="radio"
              value="ASC"
              name="radioFilter"
              defaultChecked
              data-testid="column-sort-input-asc"
            />
            ASC
            <input
              type="radio"
              value="DESC"
              name="radioFilter"
              data-testid="column-sort-input-desc"
            />
            DESC
          </div>
          <button
            type="button"
            data-testid="column-sort-button"
            className="buttonFilter"
            onClick={ () => setOrder(Sort, columnSort) }
          >
            Ordenar
          </button>
          <button
            className="buttonFilter"
            data-testid="button-remove-filters"
            type="button"
            onClick={ () => {
              setFilters([]);
              setSortOptions(['population', 'orbital_period',
                'diameter', 'rotation_period', 'surface_water']);
              setColumnOptions(['population', 'orbital_period',
                'diameter', 'rotation_period', 'surface_water']);
            } }
          >
            Remover Filtros
          </button>
        </form>
        <ul className="filterInfo">
          {
            filters.map((filter, index) => (
              <li key={ index } data-testid="filter" className="filter">
                <span>{`${filter.column} ${filter.comparison} ${filter.number}`}</span>
                <button
                  data-testid="buttonRemove-form"
                  className="removeButton"
                  type="button"
                  onClick={ () => removeFilters(filter.column) }
                >
                  X
                </button>
              </li>
            ))
          }
        </ul>
        <Table />
      </div>
    </div>
  );
}

export default Form;
