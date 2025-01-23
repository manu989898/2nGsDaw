import { useState } from "react";
export default function FilterPlanet({onFilterPlanet}) {
    const [selectedplanet, setselectedplanet] = useState("All");
    
    function handleFilter() {
        filterPlanet(selectedplanet);
    }

    
    return (
        <div className="col-md-4">
            <button onClick={filterPlanet} type="button" className="btn btn-primary w-100">Filter</button>
        <div className="col-md-4">
                    <button onClick={handleFilter} type="button" className="btn btn-primary w-100">Filter</button>
                </div>
                <div className="options dark">
          <svg
            className="icon-filter"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
          </svg>
          <select    name="planet" className="dark" onChange={(e) => setselectedplanet(e.target.value)}>    
            <option value="All">All Planets</option>
            <option value="Planet Vegeta">Planet Vegeta</option>
            <option value="Casa de Mr. Satan">Casa de Mr. Satan</option>
            <option value="Universe 7">Universe 7</option>
            <option value="Planet Earth">Planet Earth</option>
            <option value="Paoz Mountain">Paoz Mountain</option>
            <option value="Earth">Earth</option>
            <option value="Dr. Gero\'s Laboratory">Dr. Geros Laboratory</option>
            <option value="Planet Namek">Planet Namek</option>
          </select>
          
        </div>    
        </div>  

    )
}