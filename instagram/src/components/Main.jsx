import React from 'react'
import { Publicaciones } from '../data/publicacions.js'

const Main = () => {
  const publis = Publicaciones.map((publicacion) => {

  return (
    <div> 
        <main className="main-container">
            <img className="main-img" src="instagram/public/images/assets/imgs/gato.jpg" alt="publicacion" />
        </main>
  </div>
  )
}

);
return <div>{publis}</div>;
}

export default Main