import React from 'react';

const Footer = ({ publicacion, changeLikeState, changeSaveState }) => {
  const likeClass = publicacion.like ? "corazon_active" : "corazon";
  const saveClass = publicacion.save ? "guardar_active" : "guardar";

  return (
    <div className='borde'> 
      
        <header className="header-container">
          <img 
            className="perfil-img"
            src={publicacion.perfilImg} 
            alt={publicacion.perfil} />
          <div className="perfil-name-container">
          <h4 className="perfil-name">Pedro_Terminator</h4>
          <h4 className="perfil-title">Sponsored</h4>
        </div>
        <img 
        className="menu-header"
        src="../images/assets/iconos/puntos.png" 
        alt="tres puntos" />
        </header>
    
        <div> 
        <main className="main-container">
            <img 
            className="main-img" 
            src={publicacion.publicacion} 
            alt="publicacion" />
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
            <h4><span>{publicacion.likeCount}</span> Likes </h4>
            <div className="caption">
                <h4>{publicacion.perfil}</h4> <span>Hola Estoy muy feliz!!! aprediendo React JS. Mira mi gato.</span> 
            </div>
            </div>
        </div>
      </div>
  );
};

export default Footer;