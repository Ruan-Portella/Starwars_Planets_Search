/* eslint-disable react/jsx-max-depth */
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Table.css';

function Table() {
  const { filtered, inputText } = useContext(AppContext);
  return (
    <div className="tableContent">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
            </tr>
          </thead>
          <tbody>
            {
              filtered.filter((planet) => (planet.name.includes(inputText)))
                .map((planet, index) => (
                  <tr key={ index }>
                    <td data-testid="planet-name">{planet.name}</td>
                    <td>{planet.rotation_period}</td>
                    <td>{planet.orbital_period}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.gravity}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.surface_water}</td>
                    <td>{planet.population}</td>
                    <td>{planet.films}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
