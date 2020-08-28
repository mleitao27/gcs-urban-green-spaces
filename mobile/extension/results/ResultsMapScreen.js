import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';

import config from '../config';

import MarkerItem from './MarkerItem';
import MarkerDetails from './MarkerDetails';

import dictionary from '../dictionaryExtension.json';

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
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

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
    if (markers !== null)
        content = (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_MARKERS_TITLE}</Text>
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
    
    if (details === true)
        content = (
            <MarkerDetails data={detailsData} onExit={exitDetailedMarkers} navigation={props.navigation}/>
        );

    return (
        <View style={styles.container}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textContainer: {
        marginTop: windowHeight * 0.01,
        marginLeft: windowWidth * 0.03,
    },
    title: {
        fontSize: 24
    }
});

export default ResultsMapScreen;