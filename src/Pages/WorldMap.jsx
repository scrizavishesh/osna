import React, { useCallback, useRef, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Map } from '../Utils/Apis';

const containerStyle = {
    width: '100%',
    height: '480px',
};

// Default center of the map (centered on the world)
const center = {
    lat: 0,  
    lng: 0,  
};

// Array of locations with unique IDs and titles
const locations = [
    { id: 1, title: 'Location 1', lat: -20.0, lng: 130.0 },
    { id: 2, title: 'Location 2', lat: 51.16569, lng: 10.45152 },
    { id: 3, title: 'Location 3', lat: 47.48666, lng: -117.5781 },
    { id: 4, title: 'Location 4', lat: 47.65756, lng: -117.27238 },
    { id: 5, title: 'Location 5', lat: 23.68499, lng: 90.35633 },
    { id: 6, title: 'Location 6', lat: -0.78927, lng: 113.92132 },
    { id: 7, title: 'Location 7', lat: -30.55948, lng: 22.9375 },
    { id: 8, title: 'Location 8', lat: 23.47423, lng: 53.65541 },
    { id: 9, title: 'Location 9', lat: 28.57061, lng: 77.28767 },
    { id: 10, title: 'Location 10', lat: 51.16569, lng: 10.45152 }
    // Add more locations as needed
];

const WorldMap = () => {

    const [MapsCordinates, setMapsCordinates] = useState([]);
    const [mapKey, setmapKey] = useState('');



    const getEve = async () => {
        try {
            const response = await Map();
            if (response?.status === 200) {
                setmapKey(response?.data?.data?.map_api_key);
                setMapsCordinates(response?.data?.data?.map_co_ordinates);
            } else {
                toast.error("Failed to fetch events");
            }
        } catch (err) {
            toast.error(err?.message);
        }
    };

   useEffect(() => {
     getEve();
   }, [])
   


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyA9wQn1z5tIGKZXH6wpQUGQ0OIso5Cku_Y',
    });

    const mapRef = useRef(null);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        map.setOptions({
            minZoom: 2, // Minimum zoom for world view
            maxZoom: 15, // Maximum zoom for detailed location view
        });
    }, []);

    const onUnmount = useCallback((map) => {
        mapRef.current = null;
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2} // Set initial zoom to show most of the world
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Render markers for each location */}
            {locations.map(location => (
                <Marker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.title} // Show title on hover
                />
            ))}
        </GoogleMap>
    ) : <></>;
};

export default WorldMap;
