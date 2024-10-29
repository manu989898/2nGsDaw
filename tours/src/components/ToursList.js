import React from 'react';
import Tour from './Tour';
const ToursList = ({ tours, removeTour }) => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <section className="grid-tours">
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
        })}
      </section>
    </section>
  );
};

export default ToursList;
