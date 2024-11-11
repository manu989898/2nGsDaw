import React, { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Tours from './components/ToursList'
import NoTours from './components/NoTours'
import Video from './components/video.js'
import Buscador from './components/Buscador.js'

function App() {
  // TODO: Set state loading and tours
const [loading, setLoading] = useState(true)
const [tours, setTours] = useState([])
  

  // TODO: Remove Tour by id and set the new state 
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours);
  }

  // TODO: Get Tours data from json 
  const fetchTours = async () => {
    const url = '/data.json';
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false);
      setTours(tours);
    }catch (error){
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
     fetchTours()
  }, []);

  return (
    <main>
      {loading && <Loading />}
      
      {!loading && tours.length === 0 && <NoTours fetchTours={fetchTours} />}
      {!loading && tours.length > 0 && <Tours tours={tours} removeTour={removeTour} />}      
      <Video />
    </main>
  )
}

export default App
