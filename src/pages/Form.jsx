import React, { useContext } from 'react';
import Table from '../components/Table';
import AppContext from '../context/AppContext';

function Form() {
  const { inputText, setInputText,
    columnFilter, setColumnFilter,
    comparisonFilter, setComparisonFilter,
    numberFilter, setNumberFilter,
    buttonFilter, columnOptions } = useContext(AppContext);
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
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
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
      </form>
      <Table />
    </div>
  );
}

export default Form;
