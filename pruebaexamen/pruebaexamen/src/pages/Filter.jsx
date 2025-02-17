import React from "react";

export default function Filter({ setMinRating, setMaxRating, setPlanet }) {
  return (
    <div className="filter dark">
      <div className="filter-controls dark">
        <input
          type="number"
          placeholder="Minimum Rating"
          className="dark filter-input"
          onChange={(e) => setMinRating(e.target.value)}
        />
        <input
          type="number"
          placeholder="Maximum Rating"
          className="dark filter-input"
          onChange={(e) => setMaxRating(e.target.value)}
        />
        <button
          className="dark filter-button"
          onClick={(e) => {
            e.preventDefault(); // Prevent default form submission
            setPlanet(document.querySelector('select[name="planet"]').value); // Get planet value
          }}
        >
          Filter
        </button>
      </div>
      <div className="options dark">
        <select name="planet" className="dark">
          <option value="All">All Planets</option>
          <option value="Planet Vegeta">Planet Vegeta</option>
          <option value="Casa de Mr. Satan">Casa de Mr. Satan</option>
          <option value="Universe 7">Universe 7</option>
          <option value="Planet Earth">Planet Earth</option>
          <option value="Paoz Mountain">Paoz Mountain</option>
          <option value="Earth">Earth</option>
          <option value="Dr. Geros Laboratory">Dr. Geros Laboratory</option>
          <option value="Planet Namek">Planet Namek</option>
        </select>
      </div>
    </div>
  );
}
