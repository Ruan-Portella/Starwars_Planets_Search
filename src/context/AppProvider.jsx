import { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [inputText, setInputText] = useState('');
  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [sortOptions, setSortOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [filters, setFilters] = useState([]);
  const [columnSort, setColumnSort] = useState('population');
  const [Sort, setSort] = useState('ASC');

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const results = await response.json();
      setData(results.results);
      setFiltered(results.results);
    };
    fetchApi();
  }, []);

  const removeFilters = useCallback((option) => {
    setColumnOptions([...columnOptions, option]);
    const removeFilter = filters.map((columnFilters) => columnFilters)
      .filter((filter) => filter.column !== option);
    setFilters([...removeFilter]);
  }, [columnOptions, filters]);

  const buttonFilter = useCallback(() => {
    setColumnOptions(columnOptions.filter((option) => option !== columnFilter));
    setFilters([...filters, { column: columnFilter,
      comparison: comparisonFilter,
      number: numberFilter }]);
    setColumnFilter(columnOptions[0]);
  }, [columnFilter, comparisonFilter, numberFilter, filters, columnOptions]);

  const setOrder = useCallback((sort, column) => {
    setSortOptions(sortOptions.filter((option) => option !== column));
    setColumnSort(sortOptions[0]);
    const notUnknown = filtered.filter((planet) => planet[column] === 'unknown');
    const exist = filtered.filter((planet) => planet[column] !== 'unknown');
    switch (sort) {
    case 'ASC': {
      const arraySort = exist.sort((a, b) => Number(a[column] - b[column]));
      setFiltered([...arraySort, ...notUnknown]);
      break;
    }
    case 'DESC': {
      const arraySort = exist.sort((a, b) => Number(b[column] - a[column]));
      setFiltered([...arraySort, ...notUnknown]);
      break;
    }
    default: {
      break;
    }
    }
  }, [filtered, sortOptions]);

  useEffect(() => {
    let filterPlanets = [...data];
    const planetsFiltered = (planetValue, comparison, filterValue) => {
      switch (comparison) {
      case 'maior que': {
        return +planetValue > +filterValue;
      }
      case 'menor que': {
        return +planetValue < +filterValue;
      }
      case 'igual a': {
        return +planetValue === +filterValue;
      }
      default:
        return true;
      }
    };

    filters.forEach(({ column, comparison, number }) => {
      filterPlanets = filterPlanets
        .filter((planet) => planetsFiltered(
          Number(planet[column]),
          comparison,
          Number(number),
        ));
    });
    setFiltered(filterPlanets);
  }, [data, filters]);

  const values = useMemo(() => ({
    filtered,
    inputText,
    setInputText,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    numberFilter,
    setNumberFilter,
    buttonFilter,
    columnOptions,
    setColumnOptions,
    filters,
    setFilters,
    removeFilters,
    columnSort,
    setColumnSort,
    setSort,
    setOrder,
    Sort,
    sortOptions,
  }), [filtered, inputText, setInputText, columnFilter,
    setColumnFilter, comparisonFilter, setComparisonFilter,
    numberFilter, setNumberFilter, buttonFilter,
    columnOptions, filters, removeFilters, setFilters,
    setColumnOptions, columnSort, setColumnSort,
    setSort, setOrder, Sort, sortOptions,
  ]);

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
