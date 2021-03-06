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

import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';

import { Form } from 'react-native-json-forms';
import FormExtension from '../FormExtension';

import SensorsData from '../components/SensorsData';

import config from '../config';

import { Feather } from '@expo/vector-icons';

import dictionaryExtension from '../dictionaryExtension.json';
import dictionary from '../../data/dictionary.json';

import activationJSON from '../activationJSON.json';

const SurveyFormScreen = props => {

    /************************************************
     * STATES
     ************************************************/
    // Permissions
    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraRollPermission, setCameraRollPermission] = useState(null);
    const [locationPermission, setLocationPermission] = useState(null);

    // Stat e to store location
    const [location, setLocation] = useState({latitude: 38.726608, longitude: -9.1405415});
    const [locationDelta, setLocationDelta] = useState({latitudeDelta: 0.000922, longitudeDelta: 0.000421});
    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');

    // Checks if any form loaded
    const [loaded, setLoaded] = useState(null);
    // Form content
    const [form, setForm] = useState(null);
    // Immediate feedback
    const [feedback, setFeedback] = useState(null);

    // Form status
    const [status, setStatus] = useState(-1);
    const [statusKey, setStatusKey] = useState(-1);

    // Map height
    const [mapHeight, setMapHeight] = useState('100%');
    // Map type
    const [mapType, setMapType] = useState('standard');
    // Checks if after details form filling to adjust map's initial location
    const [afterDetails, setAfterDetails] = useState(false);

    // Only run one time
    // Gets permissions and user location
    useEffect(() => {

        let cancel = false;

        // Get all permissions when entering surveys to avoid errors (geocoder not running)
        const getPermissions = async () => {
            const permissions = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL, Permissions.LOCATION);
            if (cancel === false) {
                setCameraPermission(permissions.permissions.camera.status === 'granted');
                setCameraRollPermission(permissions.permissions.cameraRoll.status === 'granted');
                setLocationPermission(permissions.permissions.location.status === 'granted');
            }
        };
  
        const getLocationAsync = async () => {
            // Gets permissions
            //let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (locationPermission !== 'granted') {
                setErrorMessage('Permission to access location was denied');
            }
            
            // Gets coordinates
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            const { latitude, longitude } = location.coords;
            //if (cancel === false) setLocation({ latitude, longitude });
            if (cancel === false) setLocation({latitude: latitude, longitude: longitude});
        };
        
        getPermissions();
        getLocationAsync();

        return () => {
            cancel = true;
        };
    }, []);

    // Set map height
    useEffect(() => {
        if (mapHeight ==='0%') {
            getHeight();
            setAfterDetails(true);
        }
    }, [statusKey]);

    // Gets a form every time status change (answer is given)
    useEffect(() => {
        (async () => {
            if (status !== 15) {
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
                    Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].LOGIN_TIMEOUT);
                    props.navigation.state.params.logout();
                    props.navigation.navigate({routeName: 'Main'});
                }
                else
                    Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].UNEXPEDTED_ERROR);
            }

        })();
    }, [status]);

    /************************************************
     * FUNCTIONS
     ************************************************/
    // Updates ranking in server after every answer submitted
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

    // Handles photos submittion to server
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
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].LOGIN_TIMEOUT);
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].UNEXPEDTED_ERROR);
        }
        return data;
    };

    // Submits answer to server
    const onSubmit = async (data) => {
        
        if (status !== 19) setLoaded(null);

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
            if (parseInt(newStatus.status) !== 15 && parseInt(newStatus.status) !== 1)
                setLoaded(null);
            if (parseInt(newStatus.status) === 15) {
                updateRanking(props.navigation.state.params.email, 100);
                await getFeedback();
            }
        }
        else if (res.status === 403) {
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].LOGIN_TIMEOUT);
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }
        else
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].UNEXPEDTED_ERROR);
    };
    
    // Gets feedback from server if last answer was submitted
    const getFeedback = async () => {
        const res = await fetch(`${config.serverURL}/api/surveys/feedback`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                language: props.navigation.state.params.language
            })
        });

        if (res.status == 200) {
            setFeedback(await res.json());
        }
        else if (res.status === 403) {
            Alert.alert('ERROR', 'Login Timeout.');
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }
        else
            Alert.alert('ERROR', 'Unexpected error. Contact system admin.');
    };

    // Gets map height based on survey type
    const getHeight = () => {
        if (form === null) setMapHeight('100%');
        else if (form.type === 'details') setMapHeight('0%');
        else if (form.type === 'base') setMapHeight('60%');
        else setMapHeight('60%');
    };

    // Handles location change by user scrolling in the map
    const onRegionChangeComplete = (region) => {
        
        if (afterDetails === true) {
            setLocationDelta(({latitudeDelta: 0.000922, longitudeDelta: 0.000421}));
            setAfterDetails(false);
        }
        else setLocationDelta({latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta});
        
        setLocation({latitude: Math.round(region.latitude*1000000)/1000000, longitude: Math.round(region.longitude*1000000)/1000000});

        getHeight();
    };

    // Changes map type when button is pressed
    const changeMapType = () => {
        if (mapType === 'satellite') setMapType('standard');
        else if (mapType === 'standard') setMapType('satellite');
    };

    /************************************************
     * PRE-RENDER
     ************************************************/
    let formContent = <View />;
    if (loaded === null) {
        if (status === 15 && feedback !== null) {
            formContent = (
                <SensorsData data={feedback} />
            );
        } else {
        formContent = (<View style={styles.fallbackTextContainer}><Text style={styles.text}>{dictionaryExtension[props.navigation.state.params.language].LOADING_SURVEY}</Text></View>);
        }
    }
    else if (loaded === false)
        formContent = <View style={styles.fallbackTextContainer}><Text style={styles.text}>{dictionaryExtension[props.navigation.state.params.language].FAIL_SURVEY}</Text></View>
    else if (loaded === true) {
        formContent = (
            <ScrollView style={styles.formContainer}>
                <Form key={statusKey} json={form.form} extension={FormExtension} onSubmit={onSubmit} showSubmitButton={false} submitText={dictionaryExtension[props.navigation.state.params.language].SUBMIT} />
            </ScrollView>
        );
    }


    let mapTypeBtn = <View/>;
    if (form !== null && form.type === 'base')
        mapTypeBtn = (
            <TouchableOpacity style={styles.mapTypeBtn} onPress={changeMapType}>
                <Feather name="layers" size={24} color="#333333" />
            </TouchableOpacity>
        );
    
    let areasContent = <View/>;
    const areas = activationJSON.ActivationModes.find(element => element.mode === 'area');
    areasContent = (
        areas.areas.map(area => {
            return(
                <Circle
                    key={`${area.lat}${area.long}`}
                    center={{latitude: parseFloat(area.lat), longitude: parseFloat(area.long)}}
                    radius={Math.round(Math.sqrt(parseFloat(area.area)/Math.PI))}
                    strokeColor={'rgba(182, 210, 110, 1)'}
                    fillColor={'rgba(182, 210, 110, 0)'}
                />
            );
        })
    );
    
    /************************************************
     * RENDER
     ************************************************/
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
                    {areasContent}
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