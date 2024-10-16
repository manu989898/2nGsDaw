import React from "react";
import { seriesList } from "./data/series-static.js";
import './css/card.css';

export function Card() {
  const series = seriesList.map((serie) => {
    return(
    <article className="card">
        <div className="season">{serie.seasons}</div>
      <img src={`./img/${serie.img}`} alt={serie.title} />
        <div className="container">
          <div className="coincidencia">{serie.matching} % de coincidencia</div>
          <div className="info-card-containter">
            <div>
              <span className="pegiu">{serie.pegui}</span>
              <span className="year">{serie.year}</span>
            </div>
            <div className="tooltip">
              <div className="tooltiptext">Añadir</div>
              <span className="material-icons btn-icon">add</span>
            </div>
          </div>
          <p>{serie.desc}</p>
        </div>
      </article>
    );
  } 
  );
  return <div>{series}</div>;
}
