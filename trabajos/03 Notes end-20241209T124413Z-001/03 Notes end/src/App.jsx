import './App.css';
import { useState, useEffect } from 'react'
import NotesList from './components/NotesList.jsx'
import Header from './components/Header.jsx'
import Search from './components/Search.jsx'
import {nanoid} from 'nanoid'
 
const initialNotesList = localStorage.getItem("react-notes-app-data")?
  JSON.parse(localStorage.getItem("react-notes-app-data")):
  [
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

export default function App(){

  const [darkMode, setDarkMode] = useState(false);
  const [searchNote, setSearchNote] = useState("");
  const [notes, setNotes] = useState(initialNotesList); 


  /* Another option
  const [notes, setNotes] = useState(() =>{
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    return savedNotes || initialNotesList;
  }); 
  
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if(savedNotes) setNotes(savedNotes);
  }, [])
  */

  //This is done to save the app data into local storage
  //It is done each time notes change
  useEffect(() => {
    localStorage.setItem("react-notes-app-data",JSON.stringify(notes));
  }, [notes])

  //To add a new note
  function addNote(text){
    setNotes([...notes,
        {
          id:nanoid(),
          text: text,
          date: new Date().toLocaleDateString()
        }
    ])
  }

  function deleteNote(id){
    setNotes(notes.filter((note) => note.id != id));
  }

  return(
    <div className={darkMode && 'dark-mode'}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode}/>
        <Search handleSearchNote={setSearchNote}/>
        <NotesList notes={notes.filter((note) =>
          note.text.toLowerCase().includes(searchNote.toLowerCase()))}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}/>
      </div>
    </div>
  )
}
 
