import Note from './Note'
import AddNote from './AddNote'

// this component is storing the notes in a format
export default function NotesList({notes, handleAddNote, handleDeleteNote}){
    return (
        <div className="notes-list">
        {/*here we are going to use .map to make each note card from notes
        and also passing the functions and other states as properties*/}
           {notes.map((note)=>
               <Note id={note.id} text={note.text} date={note.date}
                     handleDeleteNote={handleDeleteNote}
               />
           )}
           <AddNote handleAddNote={handleAddNote}/>
        </div>
    )
}