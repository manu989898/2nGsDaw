import Character from "../pages/Character";
import { useState, useEffect } from "react";
import Footer from "../pages/Footer";

export default function Male() {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);


    //fetch de characters
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
    
        filtered = filtered.filter(character => character.gender === "Female");

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
      }, [characters]);
    
  
        
    return (
        
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
            

    );
  }
  