import {useState} from 'react';
import '../App.css';

export default function Tour({ id,name,price, photo, description, brand, stock}){

  return (
    <>
    <article className="card">
  <img src={`/img/${photo}`} alt="Boba Fett" />
  <h3>{name}</h3>
  <span>Price: {price} €</span>
  <div className="brand">Brand: {brand}</div>
  <div className="description">
    Description: {description}
  </div>
  <div className="stock">Stock: New ({stock.new}) | Refurbished ({stock.refurbished})</div>
  <div className="favorite">
    <i className="fas fa-heart on" />
  </div>
</article>
</>
    
  );
}