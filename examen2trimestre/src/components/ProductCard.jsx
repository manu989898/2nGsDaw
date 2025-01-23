/* eslint-disable react/prop-types */
export default function ProductCard({
  product,
  handleDelete /*toggleFavorite*/,
}) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < product.rating) {
      stars.push(<i key={i} className="fa-solid fa-star yellow-star" />);
    } else {
      stars.push(<i key={i} className="fa-solid fa-star grey-star" />);
    }
  }

  return (
    <article className="dark">
      <img src={`../public/img/${product.picture}`} alt={product.name} />
      <h3>Name: {product.name}</h3>
      <h4>Planet: {product.planet}</h4>
      <h4>Power: {product.power}</h4>
      <div className="rating">
        {stars}
        Stars: {product.rating}
      </div>

      <button className="dark" onClick={() => handleDelete(product.id)}>
        Delete
      </button>
    </article>
  );
}
