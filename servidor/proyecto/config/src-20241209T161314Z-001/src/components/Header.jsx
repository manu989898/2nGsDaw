import Navigation from './Navigation'
import { FaUser, FaHeart, FaShoppingBag, FaSearch} from "react-icons/fa"
import './header.css'

export default function Header({search, setSearch, page}){
    return(
        <header>
            <section className="top-header">
                <div className="logo-container" style={{width:"20%"}}>
                    <img src="./assets/images/logo/dress.svg" className="logo" alt="" />
                </div>
                <div className="search-container">
                    <input
                        value={search}
                        onChange={ e=> setSearch(e.target.value)}
                        type="text"
                        name="search"
                        placeholder="Enter your product name..."
                    />
                    <div className="search-btn"><FaSearch/></div>
                </div>
                <div className="icons-container">
                    <FaUser className="icon"/>
                    <FaHeart className="icon"/>
                    <FaShoppingBag className="icon"/>
                </div>
            </section>
            <Navigation page={page}/>
        </header>
    )
}