import { useState, useEffect } from 'react'
import Loading from './components/Loading.jsx'
import ToursList from './components/ToursList.jsx'
import NoTours from './components/NoTours.jsx'
import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'
import Favorites from './components/Favorites.jsx'
import AboutUs from './components/AboutUs.jsx'
import Contact from './components/Contact.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Filter from './components/Filter.jsx'

export default function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //want to filter by price
  const [price, setPrice] = useState(0);
  
  function handlePriceChange(e){
    setPrice(e.target.value);
  }

  // TODO: Remove Tour by id and set the new state 
  function removeTour(id){        
    setTours(tours.filter((tour) => tour.id != id));
  }

  // TODO: Get Tours data from json 
  async function fetchTours(){
    const url = "/data/data.json";
    try{
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setTours(data);
    }catch(error){
      setLoading(false);
      console.error(error);
    }
    
  }
  function filterToursByPrice() {
    if (price > 0) {
      console.log(price);
      return tours.filter(tour => tour.price <= price);
    }
    return tours;
  }
  
  useEffect(() => {
    fetchTours()
  }, []);
  return (
    //using router to navigate between components
    
<body className="bg-light">
      <Header/>
      <NavBar/>
      <Filter price={price} handlePriceChange={handlePriceChange} />    
      <ToursList tours={filterToursByPrice()} removeTour={removeTour} />

    </body>
  

  )
}