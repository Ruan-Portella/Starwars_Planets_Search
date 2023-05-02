import React, { useContext } from 'react';
import Table from '../components/Table';
import AppContext from '../context/AppContext';

function Form() {
  const { inputText, setInputText } = useContext(AppContext);
  return (
    <div>
      <form className="form">
        <input
          data-testid="name-filter"
          type="text"
          value={ inputText }
          onChange={ ({ target }) => setInputText(target.value) }
        />
      </form>
      <Table />
    </div>
  );
}

export default Form;
