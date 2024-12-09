import {useState} from 'react';

export default function Tour({ id, image, info, name, price, removeTour}){
  // TODO: Set state 'read more'
  const [readMore, setReadMore] = useState(false);

  function toggleReadMore(){
    setReadMore(!readMore);
  }

  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">{price}€</h4>
        </div>
        <p>
          {readMore?info:info.substring(0,200)+"..."}
          <button className={readMore?"on":"off"} onClick={toggleReadMore} >
          {readMore?"show less":"read more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
      </footer>
    </article>
  );
}