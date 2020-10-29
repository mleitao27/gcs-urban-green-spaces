import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import CustomImage from './CustomImage';

import weatherDictionary from '../weatherDictionary.json';

const SensorsData = props => {

    const metricName = (metric) => {
        if (metric === 'steps') return 'Steps: ';
        else if (metric === 'distance') return 'Distance: ';
        else if (metric === 'calories') return 'Calories: ';
        else if (metric === 'activeMinutes') return 'Active Minutes: ';
    };
    
    let googleContent = <View><Text style={styles.title}>No Google data</Text></View>;
    if (props.data.googlefit !== null)
        googleContent = (
            <View style={styles.googleContainer}>
                <Text style={styles.title}>Google Data</Text>
                {props.data.googlefit.map(g => {
                    if (g.type === 'activity') {
                        for (let a of g.value) {
                            if (g.value.indexOf(a) === 0)
                                return (
                                <View key={a}>
                                    <Text style={styles.text}>Latest Activities:</Text>
                                    <Text style={styles.text}>{a}</Text>
                                    </View>
                                );
                            return <Text key={a} style={styles.text}>{a}</Text>;
                        }
                    }
                    else {
                        return (
                            <View key={g.type} style={styles.row}>
                                <Text style={styles.text}>{metricName(g.type)}</Text>
                                <Text style={styles.text}>{g.type === 'distance' ? Math.round(g.value)/1000 :Math.round(g.value)}</Text>
                                <Text style={styles.text}>{g.type === 'distance' ? ' km' : ''}</Text>
                            </View>
                        );
                    }
                })}
            </View>
        );
    

    return (
        <View style={styles.container}>
            
            {googleContent}

            <View style={styles.weatherContainer}>
                <CustomImage imageLink={weatherDictionary[props.data.weather.description]} style={styles.weatherIcon} />
                <Text style={styles.title}>{Math.round(props.data.weather.temp-273)}ºC</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding:  Dimensions.get('window').width*0.05,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    weatherIcon: {
        height: Dimensions.get('window').width*0.15,
        width: Dimensions.get('window').width*0.15
    },
    text: {
        fontSize: 16
    },
    weatherContainer: {
        alignItems: 'flex-end',
        width: '50%'
    },
    googleContainer: {
        height: '100%',
        justifyContent: 'space-between',
        width: '50%'
    },
    title: {
        fontSize: 24
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default SensorsData;