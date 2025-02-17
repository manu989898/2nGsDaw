import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Filter from "./pages/Filter";
import Character from "./pages/Character";
import Male from "./pages/Male"; // Importamos el componente Male
import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./pages/Footer";
import Female from "./pages/Female";
function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [planet, setPlanet] = useState("All");

  // Fetch characters
  useEffect(() => {
    fetch("/data/characters.json")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
        setFilteredCharacters(data);  // Initially show all characters
      });
  }, []);

  // Filter characters based on ratings and planet
  const filterCharacters = () => {
    let filtered = [...characters];

    if (minRating) {
      filtered = filtered.filter(character => character.rating >= minRating);
    }

    if (maxRating) {
      filtered = filtered.filter(character => character.rating <= maxRating);
    }

    if (planet && planet !== "All") {
      filtered = filtered.filter(character => character.planet === planet);
    }

    setFilteredCharacters(filtered);
  };

  const deleteCharacter = (id) => {
    const newCharacters = characters.filter((character) => character.id !== id);
    setCharacters(newCharacters);
    filterCharacters();
  }

  // Update filtered characters when filters change
  useEffect(() => {
    filterCharacters();
  }, [minRating, maxRating, planet, characters]);

  return (
    <Router> 
      <Header />
      <main className="dark">
        <Filter
          setMinRating={setMinRating}
          setMaxRating={setMaxRating}
          setPlanet={setPlanet}
        />
        <Routes> 
          <Route path="/" element={
            <section id="grid-characters" className="grid-4">
            {filteredCharacters.map((character) => (
              <Character
                key={character.id}
                name={character.name}
                planet={character.planet}
                power={character.power}
                rating={character.rating}
                picture={character.picture}
                onDelete={() => deleteCharacter(character.id)}
              />
            ))}
          </section>
          } /> 
          <Route path="/male" element={<Male />} />  
          <Route path="/female" element={<Female />} /> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
