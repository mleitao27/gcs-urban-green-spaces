import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Dimensions, Modal } from 'react-native';

import config from '../config';

import ResultsItem from './ResultsItem';
import ResultsDetails from './ResultsDetails';

import dictionary from '../dictionaryExtension.json';
import Colors from '../../constants/colors';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResultsFormScreen = props => {

    const [results, setResults] = useState(null);
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
                    type: 'form'
                })
            });
    
            if (res.status === 200) {
                setResults(await res.json());
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

    const showDetailedResults = (data) => {
        setDetailsData(data);
        setDetails(true);
        props.onDetail(true);
    };

    const exitDetailedResults = () => {
        setDetails(false);
        props.onDetail(false);
    };

    let content = <View><Text>Loading Results...</Text></View>;
    if (results !== null)
        content = (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_ANSWERS_TITLE}</Text>
                </View>
                <FlatList
                    keyExtractor={item => item._id}
                    data={results}
                    renderItem={itemData => (
                        <ResultsItem data={itemData.item} onPress={showDetailedResults} navigation={props.navigation}/>
                    )}
                  />
            </View>
        );

    return (
        <View style={styles.container}>
            {content}
            <Modal visible={details} transparent={true} animationType={'fade'}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <ResultsDetails data={detailsData} onExit={exitDetailedResults} navigation={props.navigation}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%'
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
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').height*0.8,
        borderRadius: Dimensions.get('window').width*0.05,
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: Colors.primary
    },
});

export default ResultsFormScreen;