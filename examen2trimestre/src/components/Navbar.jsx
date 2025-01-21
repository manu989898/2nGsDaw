import { NavLink } from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <NavLink to="/" className={({ isActive }) =>
                    `navbar-brand ${isActive ? "resaltada" : ""}` }>                     
                    Home
                </NavLink>
                
                <NavLink to="/favorites" className={({ isActive }) =>
                    `navbar-brand ${isActive ? "resaltada" : ""}` }> 
                    Favorites
                </NavLink>
                <NavLink to="/stock" className={({ isActive }) =>
                    `navbar-brand ${isActive ? "resaltada" : ""}` }> 
                    Stock
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/aboutus" className={({ isActive }) =>
                                `navbar-brand ${isActive ? "resaltada" : ""}` }> 
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className={({ isActive }) =>
                                `navbar-brand ${isActive ? "resaltada" : ""}` }> 
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>)
}