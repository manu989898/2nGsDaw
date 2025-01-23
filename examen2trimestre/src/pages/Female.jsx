import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

// Show all products and filter by product.gender (male)
export default function Female() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    fetch("/data/characters.json")
      .then((response) => response.json())
      .then((data) => {
        const femaleProducts = data.filter((product) => product.gender.toLowerCase() === "female");
        setProducts(femaleProducts);
        setDisplayedProducts(femaleProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
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

  return (
    <div>
     <Filter onFilter={onFilter} />
    <section id="grid-characters" className="grid-4">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleDelete={(id) =>
                  setDisplayedProducts((prev) => prev.filter((item) => item.id !== id))
                }
              />
            ))}
          </section>
          </div>
  );
}
