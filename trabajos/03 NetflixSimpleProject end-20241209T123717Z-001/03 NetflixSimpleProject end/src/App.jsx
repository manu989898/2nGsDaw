import React from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import RowPost from './Components/RowPost/RowPost';
import {trending,horror,action,comedy,romance,documentaries} from './Constants/Constants.js'

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <RowPost key="1" url={trending} title="Netflix Originals" />
      <RowPost key="2" url={horror} title="Horror" isSmall/>
      <RowPost key="3" url={action} title="Action" isSmall/>
      <RowPost key="4" url={comedy} title="Comedy" isSmall/>
      <RowPost key="5" url={romance} title="Romance" isSmall/>
      <RowPost key="6" url={documentaries} title="Documentaries" isSmall/>
    </div>
  );
}
