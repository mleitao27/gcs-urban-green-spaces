import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Alert, Modal } from 'react-native';

import config from '../config';

import MarkerItem from './MarkerItem';
import MarkerDetails from './MarkerDetails';

import dictionaryExtension from '../dictionaryExtension.json';
import dictionary from '../../data/dictionary.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResultsMapScreen = props => {

    const [markers, setMarkers] = useState(null);
    const [details, setDetails] = useState(false);
    const [detailsData, setDetailsData] = useState(null);

    useEffect(() => {
        (async () => {
            
            const res = await fetch(`${config.serverURL}/api/results/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email,
                    type: 'map'
                })
            });
    
            if (res.status === 200) {
                setMarkers(Object.entries(await res.json()));
            }
            else if (res.status === 403) {
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].LOGIN_TIMEOUT);
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].UNEXPEDTED_ERROR);

        })();        
    }, []);

    const showDetailedMarkers = (data) => {
        setDetailsData(data);
        setDetails(true);
        props.onDetail(true);
    };

    const exitDetailedMarkers = () => {
        setDetails(false);
        props.onDetail(false);
    };

    let content = <View><Text>Loading Results...</Text></View>;
    if (markers !== null) {
        if (markers.length === 0) Alert.alert(dictionaryExtension[props.navigation.state.params.language].WARNING, dictionaryExtension[props.navigation.state.params.language].MARKERS_WARNING);
        content = (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{dictionaryExtension[props.navigation.state.params.language].RESULTS_MARKERS_TITLE}</Text>
                </View>
                <FlatList
                    keyExtractor={item => item[0]}
                    data={markers}
                    renderItem={itemData => (
                        <MarkerItem data={itemData.item} navigation={props.navigation} onPress={showDetailedMarkers}/>
                    )}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {content}
            <Modal visible={details} animationType={'fade'}>
                <MarkerDetails data={detailsData} onExit={exitDetailedMarkers} navigation={props.navigation}/>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        marginTop: windowHeight * 0.01,
        marginLeft: windowWidth * 0.03,
    },
    title: {
        fontSize: 24
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width*0.85,
        height: Dimensions.get('window').height*0.8,
        borderRadius: Dimensions.get('window').width*0.05,
        borderWidth: 5,
        borderColor: Colors.primary,
        overflow: 'hidden',
    },
});

export default ResultsMapScreen;