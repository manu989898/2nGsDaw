import React from 'react';

export default function Filter({ price, handlePriceChange }) {
  return (
    <div>
       <section id="filter-form" className="container py-4">
    <h2 className="mb-3">Filter by Price</h2>
    <div className="row">
      <div className="col-md-4 mb-3">
        <input
          type="number"
          className="form-control"
          id="filter-min-price"
          name="filter-min-price"
          placeholder="Minimum Price"
        />
      </div>
      <div className="col-md-4 mb-3">
        <input
           value={price}
           
          type="number"
          className="form-control"
          id="filter-price"
          name="filter-price"
          placeholder="Maximum Price"
        />
      </div>
      <div className="col-md-4">
        <button type="button" id="btn-filter" className="btn btn-primary w-100" onClick={handlePriceChange}>
          Filter
        </button>
      </div>
    </div>
  </section>
     
    </div>
  );
}
