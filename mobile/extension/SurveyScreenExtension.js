import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Alert
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import {Form} from 'react-native-json-forms';
import FormExtension from './FormExtension';

import FeedbackHandler from './FeedbackHandler';

import config from './config';

const SurveyScreenExtension = props => {

    const [fixHeight, setFixHeight] = useState('100%');

    // State to store location
    const [location, setLocation] = useState({latitude: 38.726608, longitude: -9.1405415});
    // State to store geocode
    const [geocode, setGeocode] = useState(null);
    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');

    const [loaded, setLoaded] = useState(null);
    const [form, setForm] = useState(null);

    const [status, setStatus] = useState(0);
    const [statusKey, setStatusKey] = useState(0);

    useEffect(() => {
        (async () => {
            await getLocationAsync();
            
            const res = await fetch(`${config.serverURL}/api/surveys/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email,
                    status: status
                })
            });
    
            if (res.status == 200) {
                setForm(await res.json());
                setStatusKey(status);
                setLoaded(true);
            }
            else
                Alert.alert('ERROR', 'Form unavailable.');

        })();
    }, [status]);

    // Get geolocation
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
        setLocation({ latitude, longitude });
    };
    
    // Get geocode
    const getGeocodeAsync = async (location) => {
        let geocode = await Location.reverseGeocodeAsync(location);
        setGeocode(geocode);
    };

    const onSubmit = async (data) => {
        const res = await fetch(`${config.serverURL}/api/surveys/answer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                answer: data
            })
        });
        
        if (res.status == 200) {
            const newStatus = await res.json();
            setStatus(newStatus.status);
        }
        //FeedbackHandler();
    };

    let formContent = <View style={styles.fallbackTextContainer}><Text style={styles.text}>Loading survey...</Text></View>
    if (loaded === false)
        formContent = <View style={styles.fallbackTextContainer}><Text style={styles.text}>Unable to load survey. Please go back.</Text></View>
    else if (loaded === true)
        formContent = (
            <ScrollView style={styles.formContainer}>
                <Form key={statusKey} json={form} extension={FormExtension} onSubmit={onSubmit} showSubmitButton={false} />
            </ScrollView>
        );
    
    return (
        <View style={styles.container}>
            <View style={{width: '100%', height: fixHeight}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={() => {setFixHeight('70%')}}
                >
                </MapView>
            </View>
            {formContent}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    formContainer: {
        width: '100%'
    },
    text: {
        fontSize: Dimensions.get('window').width*0.05
    },
    fallbackTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default SurveyScreenExtension;