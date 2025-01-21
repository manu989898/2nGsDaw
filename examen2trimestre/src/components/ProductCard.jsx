/* eslint-disable react/prop-types */
export default function ProductCard({product, toggleFavorite}){
    return(
        <article className="card">
            <img src={"./img/"+product.photo} alt={product.name}/>
            <h3>{product.name}</h3>
            <span>Price: {product.price} €</span>
            <div className="brand">Brand: {product.brand}</div>
            <div className="description">Description: {product.description}</div>
            <div className="stock">Stock: New ({product.stock.new}) | Refurbished ({product.stock.refurbished})</div>
            <div className="favorite">
                <i className={`fas fa-heart ${product.favorite?"on":""}`}
                onClick={() => toggleFavorite(product.id)}
                ></i>
            </div>
        </article>
    )
}

