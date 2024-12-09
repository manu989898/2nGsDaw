export default function Header(){
    return(
        <header className="header-container">
            <img
                src="./assets/imgs/Mi-gato-tiene-genes-de-leopardo.jpg"
                className="perfil-img"
                alt="icono"
            />
            <div className="perfil-name-container">
                <h4 className="perfil-name">Pedro_Terminator</h4>
                <h4 className="perfil-title">Sponsored</h4>
            </div>
            <img
                src="./assets/iconos/puntos.png"
                className="menu-header"
                alt="tres puntos"
            />
        </header>
    )
}