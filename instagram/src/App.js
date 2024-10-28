import React, { useState } from 'react';
import Footer from './components/Footer.jsx';
import { Publicaciones } from './data/publicacions.js';
import Barra from './components/BarraArriba.jsx';
import './App.css';

function App() {
  const [publis, setPublis] = useState(Publicaciones);

  const changeLikeState = (id) => {
    setPublis(publis.map(publi => 
      publi.id === id ? { ...publi, like: !publi.like, likeCount: publi.like ? publi.likeCount - 1 : publi.likeCount + 1 } : publi
    ));
  };

  const changeSaveState = (id) => {
    setPublis(publis.map(publi => 
      publi.id === id ? { ...publi, save: !publi.save } : publi
    ));
  };
  
  return (
    
    <div className='paddingo'>    
    <Barra />
      <div>
      {publis.map(publi => (
        <Footer 
        key={publi.id} 
        publicacion={publi} 
        changeLikeState={() => changeLikeState(publi.id)} 
        changeSaveState={() => changeSaveState(publi.id)} 
        />
        ))}
    </div>
    </div>

  );
}

export default App;