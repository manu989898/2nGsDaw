import { useState } from "react";

export default function Filter({onFilter}){
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    function handleFilter(){
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        onFilter(min,max);
    }

    return(
        <section id="filter-form" className="container py-4">
            <h2 className="mb-3">Filter by Price</h2>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="filter-min-price"
                        placeholder="Minimum Price"
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="filter-price"
                        placeholder="Maximum Price"
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <button onClick={handleFilter} type="button" className="btn btn-primary w-100">Filter</button>
                </div>
            </div>
        </section>
    )
}