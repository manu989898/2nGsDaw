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
  const [notes, setNotes] = useState(inicialNotesList);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if(savedNotes){
      setNotes(savedNotes);
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
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const handleDelete = (id) => {
    const updateNotes = notes.filter((note) => note.id !== id);
    setNotes(updateNotes);
  }

  return (
    
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchNote} />
        <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchNote))} handleAddNote={addNote} handleDeleteNote={handleDelete} />
      </div>
    </div>

  );
}

export default App;
