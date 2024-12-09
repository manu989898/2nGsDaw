export function Card({house}){
    return (<article className="card">
      <div className="card-image"><img src={"assets/"+house.photo} alt={house.name}/></div>
      <div className="card-content">
          <h2 className="card-name">{house.name}</h2>
          <h2 className="card-name">{house.price}</h2>
      </div>
    </article>)
  }