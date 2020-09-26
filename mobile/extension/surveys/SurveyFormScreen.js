import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Form } from 'react-native-json-forms';
import FormExtension from '../FormExtension';

import FeedbackHandler from '../FeedbackHandler';

import SensorsData from '../components/SensorsData';

import config from '../config';

import { Feather } from '@expo/vector-icons';

import dictionary from '../dictionaryExtension.json';

const SurveyFormScreen = props => {

    // Stat e to store location
    const [location, setLocation] = useState({latitude: 38.726608, longitude: -9.1405415});
    const [locationDelta, setLocationDelta] = useState({latitudeDelta: 0.000922, longitudeDelta: 0.000421});
    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');

    const [loaded, setLoaded] = useState(null);
    const [form, setForm] = useState(null);

    const [status, setStatus] = useState(-1);
    const [statusKey, setStatusKey] = useState(-1);

    const [mapHeight, setMapHeight] = useState('100%');
    const [afterDetails, setAfterDetails] = useState(false);

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
            //if (cancel === false) setLocation({ latitude, longitude });
            if (cancel === false) setLocation({latitude: latitude, longitude: longitude});
        };

        getLocationAsync();

        return () => {
            cancel = true;
        };
    }, []);

    useEffect(() => {
        if (mapHeight ==='0%') {
            getHeight();
            setAfterDetails(true);
        }
    }, [statusKey]);

    useEffect(() => {
        (async () => {
            setLoaded(null);
            const res = await fetch(`${config.serverURL}/api/surveys/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email,
                    status: status,
                    type: 'form',
                    language: props.navigation.state.params.language
                })
            });
    
            if (res.status == 200) {
                setForm(await res.json());
                setStatusKey(status);
                setLoaded(true);
            }
            else if (res.status === 403) {
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

        })();
    }, [status]);

    const updateRanking = async (email, points) => {
        const res = await fetch(`${config.serverURL}/api/profile/editRanking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                points,
                email
            })
        });
    };

    const submitPhoto = async (data) => {
        let index;
        let base64 = null;

        data.map((d, i) => {
            if (d.type === 'camera' && d.value !== '') {
                index = i;
                base64 = data[i].value;
                base64.append('email', props.navigation.state.params.email);
                data[index].value = '';
            }
        });
        
        if (base64 !== null) {
            const res = await fetch(`${config.serverURL}/api/surveys/answerImage`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: base64
            });
            
            if (res.status == 200) {
                data[index].value = await res.json();
            }
            else if (res.status === 403) {
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');
        }
        return data;
    };

    const onSubmit = async (data) => {

        data = await submitPhoto(data);

        const res = await fetch(`${config.serverURL}/api/surveys/answer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                answer: data,
                type: form.type,
                language: props.navigation.state.params.language
            })
        });
        
        if (res.status == 200) {
            // Send image
            const newStatus = await res.json();
            setStatus(newStatus.status);
            // Change this
            if (parseInt(newStatus.status) != 15 && parseInt(newStatus.status) != 1)
                setLoaded(null);
            if (parseInt(newStatus.status) === 15) updateRanking(props.navigation.state.params.email, 100);
        }
        else if (res.status === 403) {
            Alert.alert('ERROR', 'Login Timeout.');
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }
        else
            Alert.alert('ERROR', 'Unexpected error. Contact system admin.');
        //FeedbackHandler();
    };

    let formContent = <View />;
    if (loaded === null)
        formContent = <View style={styles.fallbackTextContainer}><Text style={styles.text}>Loading survey...</Text></View>
    else if (loaded === false)
        formContent = <View style={styles.fallbackTextContainer}><Text style={styles.text}>Unable to load survey. Please go back.</Text></View>
    else if (loaded === true) {
        if (statusKey === 15) {
            formContent = (
                <SensorsData form={form} />
            );
        }
        else 
            formContent = (
                <ScrollView style={styles.formContainer}>
                    <Form key={statusKey} json={form.form} extension={FormExtension} onSubmit={onSubmit} showSubmitButton={false} submitText={dictionary[props.navigation.state.params.language].SUBMIT} />
                </ScrollView>
            );
    }

    const getHeight = () => {
        if (form === null) setMapHeight('100%');
        else if (form.type === 'details') setMapHeight('0%');
        else if (form.type === 'base') setMapHeight('60%');
        else setMapHeight('60%');
    };

    const onRegionChangeComplete = (region) => {
        
        if (afterDetails === true) {
            setLocationDelta(({latitudeDelta: 0.000922, longitudeDelta: 0.000421}));
            setAfterDetails(false);
        }
        else setLocationDelta({latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta});
        
        setLocation({latitude: Math.round(region.latitude*1000000)/1000000, longitude: Math.round(region.longitude*1000000)/1000000});

        getHeight();
    };

    const changeMapType = () => {
        if (mapType === 'satellite') setMapType('standard');
        else if (mapType === 'standard') setMapType('satellite');
    };

    let mapTypeBtn = <View/>;
    if (form !== null && form.type === 'base')
        mapTypeBtn = (
            <TouchableOpacity style={styles.mapTypeBtn} onPress={changeMapType}>
                <Feather name="layers" size={24} color="#333333" />
            </TouchableOpacity>
        );
    
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
                </MapView>
            </View>
            {mapTypeBtn}
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
    text: {
        fontSize: Dimensions.get('window').width*0.05
    },
    fallbackTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default SurveyFormScreen;