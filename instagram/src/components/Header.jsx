import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="header-container">
        <img
          src="/Users/hola/Desktop/2nGsDaw/instagram/public/images/assets/imgs/Mi-gato-tiene-genes-de-leopardo.jpg"
          className="perfil-img"
          alt="icono"
        />
        <div className="perfil-name-container">
          <h4 className="perfil-name">Pedro_Terminator</h4>
          <h4 className="perfil-title">Sponsored</h4>
        </div>
        <img
          src="./images/assets/iconos/puntos.png"
          className="menu-header"
          alt="tres puntos"
        />
      </header>
    </div>
  )
}

export default Header