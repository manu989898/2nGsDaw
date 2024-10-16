import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Card } from './card.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Card />
  </React.StrictMode>
);

