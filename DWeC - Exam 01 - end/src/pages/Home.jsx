import {useState, useEffect} from "react";
import ProductCard from "../components/ProductCard";
import Product from "./Product";
import "../css/main.css";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    //FETCH DATA
  // Dentro de useEffect, verifica que el data tenga ids únicos
useEffect(() => {
    fetch("/productos.json")
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifica los datos
            setProducts(data);
            setDisplayedProducts(data);
        });
}, []);


 
    return(
        <main>
        <section className="hero">
        <h3>Trending item</h3>
        <h2>Womens <br />latest fashion sale</h2>
        <h4>starting at <span className="number">20</span>.00&euro;</h4>
        <button>SHOP NOW</button>
      </section>
        <div>
            <section className="product-grid"> 
                {displayedProducts.map(product => <Product key={product.id} product={product} />)}

              
            </section>
        </div>
        </main>
    )
}
