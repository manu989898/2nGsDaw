import './App.css';
import React, { useState, useEffect } from 'react'
import NotesList from './components/NotesList'
import Header from './components/Header'
import Search from './components/Search'
import {nanoid} from 'nanoid'
function App() {
  const inicialNotesList = [
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "15/04/2021"
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "16/04/2021"
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "17/04/2021"
    }
  ];

  const [searchNote , setSearchNote] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  
  const [notes, setNotes] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    return savedNotes || inicialNotesList; // Si hay notas guardadas, usarlas; si no, usar la lista inicial.
  });
  
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if(savedNotes){
      setNotes(savedNotes);
      console.log(savedNotes)
    }
  }
  ,[]);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  } 
  ,[notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }

  // This function is for deleting notes in note app with a id
  const deletingNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes)
  }
  return (
    
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearch={setSearchNote} />
        <NotesList notes={notes.filter((note) => 
          note.text.includes(searchNote))} 
          handleAddNote={addNote} 
          handleDelete={deletingNote} />
      </div>
    </div>

  );
}

export default App;
