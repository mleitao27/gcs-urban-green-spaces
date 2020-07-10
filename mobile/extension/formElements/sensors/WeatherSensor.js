import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import config from '../../config';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const WeatherSensor = props => {
    
    const [stop, setStop] = useState(false);

    useEffect(() => {
        (async () => {
            if (stop === false) await getGeoLocationAsync();
        })();
    }, []);
    
    // Get geolocation
    const getGeoLocationAsync = async () => {
        // Gets permissions
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }
        
        // Gets coordinates
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const { latitude, longitude } = location.coords;
        await getWeatherAsync({ latitude, longitude });
    };
    
    const getWeatherAsync = async (location) => {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${config.OWMAPIKey}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const currentWeather = await res.json();
        props.onChange(props.pageIndex, props.index, {...{sensor: 'weather'}, ...{data:{...currentWeather.main, description: currentWeather.weather[0].description}}});
        setStop(true);
    };

    return (
        <View />
    );
};

export default WeatherSensor;