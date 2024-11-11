import React from 'react';  

export default function Buscador() {
    return (
        <section className="search">
            <form className="search-form">
                <div className="form-control">
                    <label htmlFor="name">search your favorite tour</label>
                    <input type="text" id="name" />
                    <br/>
                    Dates start and end
                    <input type="date" id="start" name="trip-start"/>
                    <input type="date" id="end" name="trip-end" />
                    
                    <br/>
                    <button type="submit">search</button>

                </div>
            </form>
        </section>
    )
    }

