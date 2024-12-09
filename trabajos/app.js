import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import FilteredMap from './FilteredMap';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/filtered-map">Filtered Map</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filtered-map" element={<FilteredMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
