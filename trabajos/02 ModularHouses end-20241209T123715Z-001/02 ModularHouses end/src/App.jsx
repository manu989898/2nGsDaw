import { useEffect, useState } from "react";
import {Card} from "./component/Card.jsx"
import "./App.css"

export default function App(){
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [paginate, setPaginate] = useState(3);
  
  const paginationAmount = 3;
  const materials = ["wood", "steel frame", "cement"];

  function searchItems(){
    return items.filter(item => 
      item.material.includes(filter) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  useEffect(() => {
    fetch("/houses.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLoaded(true);
        setItems(data);
      },(error) => {
        setLoaded(true);
        setError(error);
        console.error(error);
      })
  }, [])

  if(error) return <>{error.message}</>
  else if(!loaded) return <>loading...</>
  else{    
    return(
      <div className = "wrapper">
        <div className = "search-wrapper">
          <label htmlFor="search-form">
            <input
              className="search-input"
              id="search-form"
              type="search"
              name="search-form"
              placeholder="Search for..."
              value = {search}
              onChange = {(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        <div className="select">
          <select
            className="custom-select"
            onChange = {(e) => setFilter(e.target.value)}
            aria-label = "Filter houses by material">
            <option value="">All</option>
            {materials.map(material =>
              <option value={material}>Filter by {material}</option>)}
          </select>
        </div>

        <ul className="card-grid">
          {searchItems().slice(0,paginate).map(item =>
            <li key={item.id}>
              <Card key={item.id} house={item}/>
            </li>
          )}
        </ul>

        <button onClick={() => setPaginate(paginate+paginationAmount)}>Load More</button>
      </div>
    )
  }
}