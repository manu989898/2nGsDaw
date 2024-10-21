import React from 'react';
import './Card.css';

const Card = ({name, price, description, imgs, stock, newCollection}) => {

 //si el stock es menor a 45, se muestra la imagen de soldOut
  let imageProduct = (stock<45) ?  `./assets/images/${imgs.imgProduct}`: `./assets/images/${imgs.imgSoldOut}`;

  //si es nueva coleccion, se muestra la imagen de estrella
  const showCollection = () => {  
    return  (newCollection)?
            (<span  className='new'>
                <img  className='star' src={ './assets/images/star.png' } alt=""/>
                New 
            </span>):''
  }

  return (
    <article className="card">
        <section className='card-container-img'>
            {showCollection()}
            <img className="img-product" src={ imageProduct } alt="" />
        </section>
        <section>
            <h2>{name}</h2>
            <h2>
                {price}€
                {price<200 && <span style={{marginLeft:"10px"}}>30% off</span>}
            </h2>
            <h2>{description}</h2>
        </section>
    </article>
  )
}

export default Card;