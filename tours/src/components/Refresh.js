import React from "react";

const Refresh = ({ fetchTours }) => {
    return (
        <div className="title">
        <h2>no tours left</h2>
        <button className="btn" onClick={fetchTours}>
            refresh
        </button>
        </div>
    );
    }

export default Refresh;