import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Form } from 'react-native-json-forms';
import FormExtension from '../FormExtension';

import config from '../config';
import { Feather } from '@expo/vector-icons'; 

const SurveyMapScreen = props => {

    // State to store location
    const [location, setLocation] = useState({latitude: 38.726608, longitude: -9.1405415});
    const [locationDelta, setLocationDelta] = useState({latitudeDelta: 0.000922, longitudeDelta: 0.000421});
    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');
    const [key, setKey] = useState(true);
    const [submitted, setSubmitted] = useState(true);

    const [form, setForm] = useState(null);
    const [markers, setMarkers] = useState(null);

    const [mapHeight, setMapHeight] = useState('100%');
    const [mapType, setMapType] = useState('standard');

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
            if (cancel === false) setLocation({latitude: latitude, longitude: longitude});
        };

        getLocationAsync();

        return () => {
            cancel = true;
        };
    }, []);

    useEffect(() => {
        (async () => {
            
            const resForm = await fetch(`${config.serverURL}/api/surveys/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email,
                    type: 'map',
                    language: props.navigation.state.params.language
                })
            });
    
            if (resForm.status == 200) {
                setForm(await resForm.json());
                setKey(!key);
            }
            else if (resForm.status === 403) {
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');
            
            const resMarkers = await fetch(`${config.serverURL}/api/surveys/getInfo/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email
                })
            });
    
            if (resMarkers.status == 200) {
                const markers = await resMarkers.json();
                setMarkers(markers.markers);
            }
            else if (resMarkers.status === 403) {
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

        })();
    }, [submitted]);

    const onSubmit = async (data) => {
        const res = await fetch(`${config.serverURL}/api/surveys/answer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                answer: data,
                type: form.type
            })
        });
        
        if (res.status == 200) {
            setSubmitted(!submitted);
        }
        else if (res.status === 403) {
            Alert.alert('ERROR', 'Login Timeout.');
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }
        else
            Alert.alert('ERROR', 'Unexpected error. Contact system admin.');
    };

    let formContent = <View />;
    if (form !== null)
        formContent = (
            <ScrollView style={styles.formContainer}>
                <Form key={key} json={form.form} extension={FormExtension} onSubmit={onSubmit} showSubmitButton={false} />
            </ScrollView>
        );
    
    let markersContent = <View/>;
    if (markers != null)
        markersContent = (
            markers.map(marker => {
                return (
                    <Marker
                        key={`${props.navigation.state.params.email}${marker.marker}${marker.lat}${marker.long}`}
                        coordinate={{latitude: marker.lat, longitude: marker.long}}
                    >
                        <View style={styles.markerContainer}>
                            <Image
                                source={{uri:`${config.serverURL}/public/marker1.png`}}
                                style={{flex:1, tintColor: 'white', position: 'absolute', width: Dimensions.get('window').width*0.11,
                                height: Dimensions.get('window').width*0.11}}
                            />
                            <Image
                                source={{uri:marker.imageLink}}
                                style={styles.markerIcon}
                            />
                            <Image
                                source={{uri:`${config.serverURL}/public/marker.png`}}
                                style={{flex:1, tintColor: marker.color}}
                            />
                        </View>
                    </Marker>
                );
            })
        );
        
    const onRegionChangeComplete = (region) => {
        setLocationDelta({latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta});
        setLocation({latitude: Math.round(region.latitude*1000000)/1000000, longitude: Math.round(region.longitude*1000000)/1000000});
        setMapHeight('60%');
    };

    const changeMapType = () => {
        if (mapType === 'satellite') setMapType('standard');
        else if (mapType === 'standard') setMapType('satellite');
    };

    return (
        <View style={styles.container}>
            <View style={{width: '100%', height: mapHeight}}>
                <MapView
                    mapType={mapType}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: locationDelta.latitudeDelta,
                        longitudeDelta: locationDelta.longitudeDelta,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={onRegionChangeComplete}
                >
                {markersContent}
                </MapView>
            </View>
            <TouchableOpacity style={styles.mapTypeBtn} onPress={changeMapType}>
                <Feather name="layers" size={24} color="#333333" />
            </TouchableOpacity>
            {formContent}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    formContainer: {
        width: '100%'
    },
    markerContainer: {
        width: Dimensions.get('window').width*0.11,
        height: Dimensions.get('window').width*0.11
    },
    markerIcon: {
        backgroundColor: 'white',
        overflow: 'hidden',
        width: Dimensions.get('window').width*0.03, 
        height: Dimensions.get('window').width*0.03,
        position: 'absolute',
        top:Dimensions.get('window').width*0.025,
        left:Dimensions.get('window').width*0.04
    },
    mapTypeBtn: {
        position: 'absolute', 
        top: Dimensions.get('window').height*0.45,
        right: Dimensions.get('window').width*0.03,
        backgroundColor: 'white',
        opacity: 0.7,
        padding: Dimensions.get('window').width*0.02,
        borderRadius: Dimensions.get('window').height,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
    }
});

export default SurveyMapScreen;