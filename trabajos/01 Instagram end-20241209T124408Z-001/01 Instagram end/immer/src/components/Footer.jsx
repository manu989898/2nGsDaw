import {useImmer} from "use-immer";

export default function Footer(){
   const estatInicial = {
        save: false,
        like: false,
        likes: 0
    }

    const [estat,updateEstat] = useImmer(estatInicial);

    const liked = estat.like?"corazon_active":"corazon";
    const saved = estat.save?"guardar_active":"guardar";

    function changeLike(){
        updateEstat(draft => {
            draft.like = !draft.like;
            draft.likes = draft.like?draft.likes+1:draft.likes-1;
        })
    }
    
    function changeSave(){
        updateEstat(draft => {
            draft.save = !draft.save;
        })
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