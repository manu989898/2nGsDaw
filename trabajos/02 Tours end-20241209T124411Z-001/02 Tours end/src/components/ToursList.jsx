import Tour from './Tour.jsx'

export default function ToursList({ tours, removeTour }){
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <section className="grid-tours">
        {tours.map((tour) => {
          return <Tour
                  key={tour.id}
                  removeTour={removeTour}
                  {...tour}/>
      })}
      </section>
    </section>
  );
}