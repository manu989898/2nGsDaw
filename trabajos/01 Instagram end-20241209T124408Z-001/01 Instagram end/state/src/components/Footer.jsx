import {useState} from "react";

export default function Footer(){
    const initialState = {
        save: false,
        like: false,
        likes: 0
    }

    const [estat,setEstat] = useState(initialState);

    const liked = estat.like?"corazon_active":"corazon";
    const saved = estat.save?"guardar_active":"guardar";

    function changeLike(){
        setEstat(s => ({
            save:s.save,
            like:!s.like,
            likes:s.like?s.likes-1:s.likes+1
        }))
    }

    
    function changeSave(){
        setEstat(s => ({
            ...s,
            save:!s.save
        }))        
    }

    return(
        <div className="footer">
            <div className="footer-icons">
                <span className={liked} id="corazon" onClick={changeLike}></span
                ><span className="burbuja" id="b1"></span
                ><span className="enviar" id="e1"></span>
                <div className="guardar-icon-container">
                    <span className={saved} id="guardar" onClick={changeSave}></span>
                </div>
            </div>
            <div className="caption-container">
                <h4><span>{estat.likes}</span> Likes</h4>
                <div className="caption">
                    <h4>Pedro_Terminator</h4>
                    <span
                        >Hola Estoy muy feliz!!! aprediendo React
                        JS. Mira mi gato.</span
                    >
                </div>
            </div>
        </div>
    )
}