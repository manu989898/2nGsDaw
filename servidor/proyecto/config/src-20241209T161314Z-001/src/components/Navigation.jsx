import {Link} from 'react-router-dom'

export default function Navigation({page}){
    return(    
        <nav className="main-nav">
            <Link to="/home" className={page=="home"?"activate":""}>Home</Link>
            <Link to="#">Categories</Link>
            <Link to="#">Men's</Link>
            <Link to="#">Women's</Link>
            <Link to="#">Jewelry</Link>
            <Link to="/add" className={page=="add"?"activate":""}>Add</Link>
            <Link to="/offers" className={page=="offers"?"activate":""}>Hot Offers</Link>
        </nav>
    )
}


