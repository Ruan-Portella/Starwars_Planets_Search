import { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const results = await response.json();
      setData(results.results);
      setInitialData(results.results);
    };
    fetchApi();
  }, []);

  const buttonFilter = useCallback(() => {
    switch (comparisonFilter) {
    case 'maior que': {
      const filtered = data
        .filter((person) => Number(person[columnFilter]) > Number(numberFilter));
      setData(filtered);
      setFilters([...filters, { columnFilter, comparisonFilter, numberFilter }]);
      break;
    }
    case 'menor que': {
      const filtered = data
        .filter((person) => Number(person[columnFilter]) < Number(numberFilter));
      setData(filtered);
      setFilters([...filters, { columnFilter, comparisonFilter, numberFilter }]);
      break;
    }
    case 'igual a': {
      const filtered = data
        .filter((person) => Number(person[columnFilter]) === Number(numberFilter));
      setData(filtered);
      setFilters([...filters, { columnFilter, comparisonFilter, numberFilter }]);
      break;
    }
    default:
      break;
    }
  }, [columnFilter, comparisonFilter, data, numberFilter, filters]);

  const values = useMemo(() => ({
    data,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    numberFilter,
    setNumberFilter,
    buttonFilter,
  }), [data, inputText, setInputText, columnFilter,
    setColumnFilter, comparisonFilter, setComparisonFilter,
    numberFilter, setNumberFilter, buttonFilter]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AppProvider;
