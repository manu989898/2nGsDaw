import { FaStar } from "react-icons/fa";
import './card.css'

import {calculatePriceDiscountProduct} from "../util/discount.js"

export default function Card({name, description, price, stars, image, percentDiscount}){
    let arrayStars = [];
    for(let i=0; i<5; i++){
        arrayStars.push(<FaStar key={i} className={i<stars?"yellow-star":"grey-star"}/>)
    }

    return(
        <article className="card">
          {percentDiscount==50 && <div className="offer">50 %</div>}
          <div className="info-1">
            <img src={"./assets/images/products/"+image} alt={name}/>
            <h3>{name}</h3>
            <h4>{description}</h4>
          </div>
          <div className="info2">
            <div className="showcase-rating">
                {arrayStars}
            </div>
            <div className="price-box">
              {percentDiscount?<p className="price">{calculatePriceDiscountProduct(price,percentDiscount,2)} € <del>{price.toFixed(2)} €</del></p>
                :<p className="price">{price.toFixed(2)} €</p>}
              <button>Add</button>
            </div>
          </div>
        </article>
    )
}