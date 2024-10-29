import React, { useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
const Tour = ({ id, image, info, name, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);
  const [LikeCounter, setLikeCounter] = useState(0);
    
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">{price}€</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button className={readMore ? "on":"off"} onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
        <div className='contadorDeLikes'>
          <AiFillDislike className='aiFill' onClick={() => setLikeCounter(LikeCounter - 1)}> - </AiFillDislike>
          <p>{LikeCounter}</p>
          <AiFillLike className='aiFill' onClick={() => setLikeCounter(LikeCounter + 1)}> - </AiFillLike>
        </div>
      </footer>
    </article>
  );
};
export default Tour;
