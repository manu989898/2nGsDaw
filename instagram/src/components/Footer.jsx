import React, {useState} from 'react'
import { Publicaciones } from '../data/publicacions.js'

const Footer = () => {

  const inicialState = {
    save:false,
    like:false,
    likeCount:0,
  };

  const [state, setState] = useState(inicialState);

  const likeClass = state.like?"corazon_active":"corazon";
  const saveClass = state.save?"guardar_active":"guardar";

  const changeLikeState = () => {
    setState(preState =>({
        ...preState, // se usa para decir dejame todos como estaban y modificame los siguientes de abajo.
        like: !preState.like, //Cambiamos el valor de like
        likeCount: (preState.like?  preState.likeCount-1 : preState.likeCount+1) //Cambiamos el valor de likeCount
    }));
  };
  
  const changeSaveState = () => {
    setState(preState =>({
        ...preState, 
        save: !preState.save
    }));
  };
  const publis = Publicaciones.map((publicacion) => {

  return (
    
    <div className='borde'> 
      <div> 
      <header className="header-container">
        <img
          src="../images/assets/imgs/Mi-gato-tiene-genes-de-leopardo.jpg"
          className="perfil-img"
          alt="icono"
        />
        <div className="perfil-name-container">
          <h4 className="perfil-name">Pedro_Terminator</h4>
          <h4 className="perfil-title">Sponsored</h4>
        </div>
        <img
          src="../images/assets/iconos/puntos.png"
          className="menu-header"
          alt="tres puntos"
        />
      </header>
    </div>
      <div> 
        <main className="main-container">
            <img className="main-img" src="../images/assets/imgs/gato.jpg" alt="publicacion" />
        </main>
  </div>
        <div className="footer">
            <div className="footer-icons">
            <span  className={likeClass} id="corazon" onClick={changeLikeState}></span>
            <span className="burbuja" id="b1"></span>
            <span className="enviar" id="e1"></span>
            <div className="guardar-icon-container">
                <span className={saveClass} id="guardar" onClick={changeSaveState}></span>
            </div>
            </div>
            <div className="caption-container">
            <h4><span>{state.likeCount}</span> Likes </h4>
            <div className="caption">
                <h4>Pedro_Terminator</h4> <span>Hola Estoy muy feliz!!! aprediendo React JS. Mira mi gato.</span> 
            </div>
            </div>
        </div>
    </div>
  )
}

);
return <div>{publis}</div>;
}

export default Footer;