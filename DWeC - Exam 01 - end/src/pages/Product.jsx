import "../css/card.css";  // Correct import
export default function Product ({product}) {


return (
    <article className="card">
        <div className="offer">
           {product.price}
        </div> 
        <div className="info-2">
       <img src={product.image} alt={name}/>
       <h3>{product.name}</h3>
         <h4>{product.description}</h4> 
        </div>
        </article>

)
}
