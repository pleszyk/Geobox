import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './index.css';
import Map from './components/Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Map />);
