import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';

import config from './config';

import ResultsItem from './ResultsItem';
import ResultsDetails from './ResultsDetails';

const ResultsScreenExtension = props => {

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
                    email:  props.navigation.state.params.email
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
    };

    const exitDetailedResults = () => {
        setDetails(false);
    };

    let content = <View><Text>Loading Results...</Text></View>;
    if (results !== null)
        content = (
            <FlatList
                keyExtractor={item => item._id}
                data={results}
                renderItem={itemData => (
                    <ResultsItem data={itemData.item} onPress={showDetailedResults} navigation={props.navigation}/>
                )}
              />
        );
    if (details === true)
    content = (
        <ResultsDetails data={detailsData} onExit={exitDetailedResults} navigation={props.navigation}/>
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
    }
});

export default ResultsScreenExtension;