


export default function Character({name, planet, power, rating, picture, onDelete})    {
   

    return(
        <article className="dark">
        <img src={`./img/${picture}`} alt="Vegeta"/>
        <h3>Name: {name}</h3>
        <h4>Planet: {planet}</h4>
        <h4>Power: {power}</h4>
        <div className="rating">
            {rating}
            </div>
        <button onClick={onDelete} className="dark">Delete</button>
     </article>
    )
}