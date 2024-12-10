import { useState, useEffect } from 'react'
import Header from '../components/Header'
import CardOffer from '../components/CardOffer'
import { getOffers } from '../service/ProductsService'

export default function HotOffersPage(){
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    const filteredProducts = () => products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
       
    useEffect(() => {
        getOffers().then(data => setProducts(data))
    }, []);
    

    return(
        <>
            <Header search={search} setSearch={setSearch} page="offers" />            
            <main>  
                <h2>Offers</h2>
                <section class="offer-grid">
                    {filteredProducts().map(product =>
                            <CardOffer key={product.id} {...product}/>
                    )}
                </section>
            </main>
            </>
    )
}