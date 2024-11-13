import React from 'react'
import {MdDeleteForever} from 'react-icons/md'
/*this is our note card component
here am using id,text,date,handleDeleteNote as props which have been defined in App.js*/

function Note({id, text, date, handleDelete}) {
    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
            {/*it will store date on which the user is going to create the note*/} 
                <small>{date}</small>
                {/*this is for deleting the note using each note's unique id as parameter
                so we have passed handleDeleteNote function as it's onClick event*/}
                <MdDeleteForever onClick={()=>handleDelete(id)} className="delete-icon" size="1.3em" color="black" />
            </div>
            
        </div>
    )
}

export default Note
