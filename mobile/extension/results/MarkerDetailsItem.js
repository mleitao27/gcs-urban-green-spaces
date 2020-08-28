import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import CustomImage from '../components/CustomImage';

const MarkerDetailsItem = props => {
    return (
        <View style={{...styles.container, borderColor: props.marker.color, backgroundColor: props.marker.color}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <CustomImage imageLink={props.marker.marker} style={{...styles.markerImage, tintColor: 'white'}} />
            </View>
            <View style={styles.textContainer}>
                <Text style={{...styles.text, ...styles.title}}>Latitude: </Text>
                <Text style={styles.text}>{props.marker.lat}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{...styles.text, ...styles.title}}>Longitude: </Text>
                <Text style={styles.text}>{props.marker.long}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{...styles.text, ...styles.title}}>Date: </Text>
                <Text style={styles.text}>{props.marker.date}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={{...styles.text, ...styles.title}}>Time: </Text>
                <Text style={styles.text}>{props.marker.time}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: Dimensions.get('window').width*0.05,
        marginVertical: Dimensions.get('window').width*0.025,
        paddingHorizontal: Dimensions.get('window').width*0.05,
        paddingVertical: Dimensions.get('window').width*0.025,
        paddingBottom: Dimensions.get('window').width*0.035,
        borderWidth: 1,
        borderRadius: (Dimensions.get('window').height + Dimensions.get('window').width) * 0.01
    },
    markerImage: {
        height: Dimensions.get('window').width*0.1,
        width: Dimensions.get('window').width*0.1,
    },
    text: {
        color: 'white'
    },
    title: {
        fontWeight: 'bold'
    },
    textContainer: {
        flexDirection: 'row'
    }
});

export default MarkerDetailsItem;