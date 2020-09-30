import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';

import CustomImage from '../components/CustomImage';

import config from '../config';

import strings from '../strings.json';
import dictionary from '../dictionaryExtension.json';
import globalStyles from '../../constants/globalStyles';

import weatherDictionary from '../weatherDictionary.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResultsItem = props => {

    const [imageResults, setImageResults] = useState(null);

    useEffect(() => {

        let cancel = false;

        const getImage = async () => {

            const ugsName = props.data.data.find(d => d.id === strings.BASE_UGS_LIST);
            
            if (typeof ugsName !== 'undefined')
                if (ugsName.value !== '' && ugsName.value !== 'Other') {
                    const res = await fetch(`${config.serverURL}/api/results/`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email:  props.navigation.state.params.email,
                            ugs: ugsName.value,
                            type: 'image'
                        })
                    });
                    if (res.status === 200) {
                        var temp = await res.json();
                        if (temp.length > 0)
                            if (temp[0].valid === true)
                                if (cancel === false) setImageResults(`data:image/png;base64,${temp[0].base64}`);
                    }
                    else if (res.status === 403) {
                        Alert.alert('ERROR', 'Login Timeout.');
                        props.navigation.state.params.logout();
                        props.navigation.navigate({routeName: 'Main'});
                    }
                    else
                        Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

                }
        };

        getImage();

        return () => {
            cancel = true;
        };   
    }, []);

    let content = <View />;
    if (props.data.done === true) {
        const date = new Date(props.data.timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ugs = props.data.data.find(d => d.id === strings.BASE_UGS_LIST).value;
        const temp = props.data.data.find(d => d.id === strings.BASE_SENSORS_WEATHER).value.data.temp;
        const weather = props.data.data.find(d => d.id === strings.BASE_SENSORS_WEATHER).value.data.description;
        const motivation = props.data.data.find(d => d.id === strings.BASE_MOTIVATION).value;

        let BackgroundComponent;
        if (imageResults !== null)
            BackgroundComponent = (
                <Image source={{uri: imageResults}} style={styles.backgroundImage}/>
            );

        content = (
            <TouchableOpacity style={{...globalStyles.shadow, ...styles.container}} onPress={props.onPress.bind(this, props.data.data)}>
                {BackgroundComponent}
                <View style={styles.contentContainer}>
                    <View style={styles.timePlaceAndWeather}>
                        <View style={{flex:1}}>
                            <Text style={styles.title}>{ugs}</Text>
                            <Text>{day}/{month}/{year}</Text>
                            <Text>{hours}h{minutes}m</Text>
                        </View>
                        <View>
                            <CustomImage imageLink={weatherDictionary[weather]} style={styles.motivationIcon} />
                            <Text>{Math.round(temp-273)}ºC</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{dictionary[props.navigation.state.params.language].RESULTS_MOTIVATION}:</Text>
                        <View style={styles.motivation}>
                            {motivation.map(m => {return <CustomImage key={m} imageLink={m === 'other' ? dictionary[props.navigation.state.params.language].OTHER : m} style={styles.motivationIcon}/>})}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.center}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '85%',
        height: windowHeight * 0.2,
        backgroundColor: 'white',
        marginVertical: windowHeight * 0.02,
    },
    contentContainer: {
        height: windowHeight * 0.2,
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowHeight * 0.01,
        justifyContent: 'space-between',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
        position: 'absolute'
    },
    timePlaceAndWeather: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    motivation: {
        flexDirection: 'row',
        width: '100%'
    },
    motivationIcon: {
        height: windowWidth * 0.07,
        width: windowWidth * 0.07,
        marginRight: windowWidth * 0.02,
        marginTop: windowHeight * 0.01
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    center: {
        alignItems: 'center'
    }
});

export default ResultsItem;