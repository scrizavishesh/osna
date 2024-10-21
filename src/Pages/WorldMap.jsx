import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const WorldMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 5,
    width: '100%',
    height: '500px',
  });

  const locations = [
    { lat: 28.7041, lng: 77.1025, title: 'Delhi' },
    { lat: 19.0760, lng: 72.8777, title: 'Mumbai' },
    { lat: 12.9716, lng: 77.5946, title: 'Bangalore' },
  ];

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoidmlzaGVzaHNjcml6YSIsImEiOiJjbTJlcXppNmowMWw0MmtxeTF5dzlucnd3In0.Nfsl9rP33_k8Sut9ErSKmQ"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {locations.map((loc, index) => (
        <Marker key={index} latitude={loc.lat} longitude={loc.lng}>
          <div>{loc.title}</div>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default WorldMap;
