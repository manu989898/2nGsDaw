import React, { useEffect, useState } from 'react';
import { fetchData } from './api'; // Si quieres usar Axios
// Si usas el JSON estático, importa:
// import jsonData from './data.json';

function FilteredMap() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('A'); // Cambia esto para filtrar otra categoría

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiData = await fetchData('/endpoint'); // Cambia '/endpoint' por la ruta real
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };
    // Usa el JSON local si no tienes API
    // setData(jsonData);
    loadData();
  }, []);

  const filteredData = data.filter(item => item.category === filter);

  return (
    <div>
      <h1>Filtered Map</h1>
      <label>
        Filter by Category:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>
      </label>
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>
            {item.name} (Category: {item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilteredMap;
