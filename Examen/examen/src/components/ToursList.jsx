import Tour from './Tour.jsx'
import LoadMoreTours from './LoadMoreTours.jsx';
import {useState} from 'react';
export default function ToursList({ tours,  removeTour, moreTours }) {

  //show only 8 tours 
  tours = tours.slice(0,8);
  
  return (
    <section>
      
      <div className="text-center mb-5">
        <LoadMoreTours loadMoreTours={moreTours}/>
  </div>
      <section id="figures-list" className="container py-4">
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
