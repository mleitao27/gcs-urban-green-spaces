import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import CustomImage from '../components/CustomImage';

const MarkerDetailsItem = props => {
    return (
        <View style={styles.container}>
            <CustomImage imageLink={props.marker.marker} style={{...styles.markerImage, tintColor: props.marker.color}} />
            <Text>Latitude: {props.marker.lat}</Text>
            <Text>Longitude: {props.marker.long}</Text>
            <Text>Date: {props.marker.date}</Text>
            <Text>Time: {props.marker.time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: Dimensions.get('window').width*0.05,
        marginVertical: Dimensions.get('window').width*0.025,
        paddingHorizontal: Dimensions.get('window').width*0.05,
        paddingVertical: Dimensions.get('window').width*0.025,
        borderWidth: 1
    },
    markerImage: {
        height: Dimensions.get('window').width*0.1,
        width: Dimensions.get('window').width*0.1
    }
});

export default MarkerDetailsItem;