import React, {useState} from 'react'

const Footer = () => {

  const inicialState = {
    save:false,
    like:false,
    likeCount:0
  };

  const [state, setState] = useState(inicialState);

  const likeClass = state.like?"corazon_active":"corazon";
  const saveClass = state.save?"guardar_active":"guardar";

  const changeLikeState = () => {
    setState(preState =>({
        ...preState,
        like: !preState.like,
        likeCount: (preState.like?  preState.likeCount-1 : preState.likeCount+1)
    }));
  };
  
  const changeSaveState = () => {
    setState(preState =>({
        ...preState,
        save: !preState.save
    }));
  };

  return (
    <div>
        <div className="footer">
            <div className="footer-icons">
            <span  className={likeClass} id="corazon" onClick={changeLikeState}></span>
            <span className="burbuja" id="b1"></span>
            <span className="enviar" id="e1"></span>
            <div className="guardar-icon-container">
                <span className={saveClass} id="guardar" onClick={changeSaveState}></span>
            </div>
            </div>
            <div className="caption-container">
            <h4><span>{state.likeCount}</span> Likes </h4>
            <div className="caption">
                <h4>Pedro_Terminator</h4> <span>Hola Estoy muy feliz!!! aprediendo React JS. Mira mi gato.</span> 
            </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;