// Imports
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Gets user geolocation and sends it w/o any interaction
const GeolocationSensor = props => {

    // State to store location
    const [location, setLocation] = useState(null);
    // State to store geocode
    const [geocode, setGeocode] = useState(null);
    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');

    // Get geolocation when component is used
    useEffect(() => {
        let cancel = false;

        const getLocationAsync = async () => {
            // Gets permissions
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
            }
    
            // Gets coordinates
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            const { latitude, longitude } = location.coords;
            await getGeocodeAsync({ latitude, longitude });
            if (cancel === false) setLocation({ latitude, longitude });
        };
    
        // Get geocode
        const getGeocodeAsync = async (location) => {
            let geocode = await Location.reverseGeocodeAsync(location);
            if (cancel === false) setGeocode(geocode);
        };

        // Only gets location once
        if (location === null && geocode === null)
            // Get location
            getLocationAsync();

        // Only sends answer if there is data to send
        if (geocode !== null && location !== null)
            // Send location data(geocode + lat + long) to form component
            props.onChange(props.pageIndex, props.index, {sensor: 'geolocation', data: { ...geocode[0], ...location }});
        
            return () => {
            cancel = true;
        };
    }, [location, geocode]);

    // Get geolocation

    // Render dummy view
    return (
        <View />
    );

};

export default GeolocationSensor;