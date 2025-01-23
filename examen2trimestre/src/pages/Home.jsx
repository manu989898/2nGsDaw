import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    fetch("/data/characters.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setDisplayedProducts(data);
      })
      .then((dog) => console.log(dog));
  }, []);

  function onFilter(minPower, maxPower) {
    if (isNaN(minPower)) minPower = 0;
    const min = parseFloat(minPower);

    if (isNaN(maxPower)) maxPower = Infinity;
    const max = parseFloat(maxPower);

    const filteredProducts = products.filter((product) => {
      const price = parseFloat(product.power);
      return price >= min && price <= max;
    });
    setDisplayedProducts(filteredProducts);
  }

  function onDelete(id) {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setDisplayedProducts(updatedProducts);
  }

  return (

   
        <div>
          <Filter onFilter={onFilter} />
         

          <section id="grid-characters" className="grid-4">
          {displayedProducts.map((product) => (
              
              <ProductCard
                key={product.id}
                product={{ ...product }}
                handleDelete={onDelete}
              />
            ))}
          </section>
        </div>


    );
}
