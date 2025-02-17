import {useState, useEffect} from "react";

import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [favorites, setFavorites] = useState(()=>
        JSON.parse(localStorage.getItem("favorites"))
        ?JSON.parse(localStorage.getItem("favorites")):[]);

    useEffect(() => {
        const localStorageProducts = JSON.parse(localStorage.getItem("products"));
        if(localStorageProducts){            
            setProducts(localStorageProducts);
            let favotiredProducts = localStorageProducts.filter(product => favorites.includes(product.id));
            setDisplayedProducts(favotiredProducts.slice(0,8));
        }
    }, [favorites]);

  
    function onFilter(minPrice, maxPrice){  
        if(isNaN(minPrice)) minPrice = 0;     
        const min = parseFloat(minPrice);
        
        if(isNaN(maxPrice)) maxPrice = Infinity;  
        const max = parseFloat(maxPrice);

        const filteredProducts = products.filter(product => {
            const price = parseFloat(product.price);
            return price >= min && price <= max;
        })

        setDisplayedProducts(filteredProducts);
    }

    function toggleFavorite(id){  
        const updatedFavorites = favorites.includes(id)
            ?favorites.filter(favoriteId => favoriteId != id)
            :[...favorites,id];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites",JSON.stringify(updatedFavorites));
    }

    return(
        <div>
            <Filter onFilter={onFilter}/>
            <section id="figures-list" className="container py-4"> 
                {displayedProducts.map(product => (                    
                    <ProductCard
                        key={product.id}
                        product={{...product, favorite: favorites.includes(product.id)}}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </section>
        </div>
    )


}
