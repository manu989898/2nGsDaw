<>
  <meta charSet="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="/logo192.png" />
  <link rel="manifest" href="/manifest.json" />
  <title>React App</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css);"
    }}
  />
  <div id="root">
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <a aria-current="page" className="pagines destacar" href="/">
              Characters
            </a>
          </li>
          <li>
            <a className="pagines" href="/male">
              Male
            </a>
          </li>
          <li>
            <a className="pagines" href="/female">
              Female
            </a>
          </li>
          <li>
            <a className="pagines" href="/about">
              About us
            </a>
          </li>
          <li>
            <a className="pagines" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main className="dark">
      <div className="filter dark">
        <div className="filter-controls dark">
          <input
            type="number"
            placeholder="Minimum Rating"
            className="dark filter-input"
            defaultValue=""
          />
          <input
            type="number"
            placeholder="Maximum Rating"
            className="dark filter-input"
            defaultValue=""
          />
          <button className="dark filter-button">Filter</button>
        </div>
        <div className="options dark">
          <svg
            className="icon-filter"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
          </svg>
          <select name="planet" className="dark">
            <option value="All">All Planets</option>
            <option value="Planet Vegeta">Planet Vegeta</option>
            <option value="Casa de Mr. Satan">Casa de Mr. Satan</option>
            <option value="Universe 7">Universe 7</option>
            <option value="Planet Earth">Planet Earth</option>
            <option value="Paoz Mountain">Paoz Mountain</option>
            <option value="Earth">Earth</option>
            <option value="Dr. Gero\'s Laboratory">
              Dr. Gero\'s Laboratory
            </option>
            <option value="Planet Namek">Planet Namek</option>
          </select>
        </div>
      </div>
      <section id="grid-characters" className="grid-4">
        <article className="dark">
          <img src="./img/vegeta.png" alt="Vegeta" />
          <h3>Name: Vegeta</h3>
          <h4>Planet: Planet Vegeta</h4>
          <h4>Power: 2000</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star-half-stroke yellow-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/boogordo.png" alt="Majin Boo" />
          <h3>Name: Majin Boo</h3>
          <h4>Planet: Casa de Mr. Satan</h4>
          <h4>Power: 12500</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/freeza.png" alt="Frieza" />
          <h3>Name: Frieza</h3>
          <h4>Planet: Universe 7</h4>
          <h4>Power: 125000</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/trunks.png" alt="Trunks" />
          <h3>Name: Trunks</h3>
          <h4>Planet: Planet Earth</h4>
          <h4>Power: 1205</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star-half-stroke yellow-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/gohan.png" alt="Son Gohan" />
          <h3>Name: Son Gohan</h3>
          <h4>Planet: Paoz Mountain</h4>
          <h4>Power: 10025</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star-half-stroke yellow-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/bulma.png" alt="Bulma" />
          <h3>Name: Bulma</h3>
          <h4>Planet: Earth</h4>
          <h4>Power: 50</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/cell.png" alt="Cell" />
          <h3>Name: Cell</h3>
          <h4>Planet: Dr. Gero\'s Laboratory</h4>
          <h4>Power: 125000</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/chichi.png" alt="Chi-Chi" />
          <h3>Name: Chi-Chi</h3>
          <h4>Planet: Earth</h4>
          <h4>Power: 120</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star-half-stroke yellow-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/piccolo.png" alt="Piccolo" />
          <h3>Name: Piccolo</h3>
          <h4>Planet: Planet Namek</h4>
          <h4>Power: 14000</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/yamcha.png" alt="Yamcha" />
          <h3>Name: Yamcha</h3>
          <h4>Planet: Earth</h4>
          <h4>Power: 900</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/krillin.png" alt="Krillin" />
          <h3>Name: Krillin</h3>
          <h4>Planet: Earth</h4>
          <h4>Power: 1000</h4>
          <div className="rating">
            <i className="fa-solid fa-star-half-stroke yellow-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
            <i className="fa-solid fa-star grey-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
        <article className="dark">
          <img src="./img/goku.png" alt="Goku" />
          <h3>Name: Goku</h3>
          <h4>Planet: Planet Earth</h4>
          <h4>Power: 150000</h4>
          <div className="rating">
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
            <i className="fa-solid fa-star yellow-star" />
          </div>
          <button className="dark">Delete</button>
        </article>
      </section>
    </main>
    <footer>
      <p>© 2025 Dragon Ball Fan Page. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="#terms">Terms of Service</a>
        </li>
        <li>
          <a href="#privacy">Privacy Policy</a>
        </li>
      </ul>
    </footer>
  </div>
</>


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
            });
    }, []);

    function onFilter({ min, max, planet }) {
        const filteredProducts = products.filter((product) => {
            const matchesPower =
                (min === null || product.power >= min) &&
                (max === null || product.power <= max);
            const matchesPlanet = !planet || product.planet === planet;
            return matchesPower && matchesPlanet;
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
            <section id="figures-list" className="container py-4">
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
