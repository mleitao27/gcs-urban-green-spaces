import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import config from '../config';

import strings from '../strings.json';

const MarkerItem = props => {

    const [imageMarkers, setImageMarkers] = useState(null);

    useEffect(() => {

        let cancel = false;

        const getImage = async () => {
            const res = await fetch(`${config.serverURL}/api/results/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email,
                    ugs: props.data[0],
                    type: 'image'
                })
            });
            if (res.status === 200) {
                var temp = await res.json();
                if (temp.length > 0)
                    if (temp[0].valid === true)
                        if (cancel === false) setImageMarkers(`data:image/png;base64,${temp[0].base64}`);
            }
            else if (res.status === 403) {
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

        };

        getImage();

        return () => {
            cancel = true;
        };   
    }, []);

    let BackgroundComponent;
        if (imageMarkers !== null)
            BackgroundComponent = (
                <Image source={{uri: imageMarkers}} style={styles.backgroundImage}/>
            );
    
    return (
        <View style={styles.center}>
            <TouchableOpacity style={styles.container} onPress={props.onPress.bind(this, props.data[1])}>
                {BackgroundComponent}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{props.data[0]}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 20,
        flex: 1,
        width: '75%',
        height: Dimensions.get('window').height * 0.2,
        backgroundColor: Colors.secondary,
        marginVertical: Dimensions.get('window').height * 0.03,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingVertical: Dimensions.get('window').height * 0.02,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
        position: 'absolute'
    },
    title: {
        fontSize: 36
    },
    center: {
        alignItems: 'center'
    }
});

export default MarkerItem;