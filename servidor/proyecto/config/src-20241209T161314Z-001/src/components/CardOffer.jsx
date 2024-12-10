import './cardOffer.css'

export default function CardOffer({name, description, price, image}){
    return(
        <article className="card-offer">
          <div className="image-box">
            <img src={"./assets/images/products/"+image} alt={name}/>
          </div>
          <div className="info-box">
            <h3>{name}</h3>
            <h4>{description}</h4>
            <span className="price">{price.toFixed(2)} €</span>
          </div>       
        </article>
    )
}