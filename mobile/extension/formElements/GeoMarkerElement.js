import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions, Image } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const PickerElement = props => {

    const pick = async (value, link, color) => {
        const location = await getLocationAsync();

        const marker = {
            marker: value,
            lat: location.latitude,
            long: location.longitude,
            imageLink: link,
            color
        };

        props.onChange(props.pageIndex, props.index, marker);
    };

    // Get geolocation
    const getLocationAsync = async () => {
        // Gets permissions
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }

        // Gets coordinates
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const { latitude, longitude } = location.coords;
        return { latitude, longitude };
    };

    let content = [];
    props.props.categories.map((cat) => {
        content.push(<Text key={cat.name} style={styles.title}>{cat.name}</Text>);
        cat.markers.map(marker => {
            content.push(
                <TouchableOpacity key={marker.value} style={{...styles.item, backgroundColor: marker.color}} onPress={pick.bind(this, marker.value, marker.imageLink, marker.color)}>
                    <Text style={styles.text}>{marker.label}</Text>
                    <Image style={styles.image} source={{uri: marker.imageLink}} />
                </TouchableOpacity>
            );
        })
    });

    return (
        <View style={styles.container}>
            {content.map((c) => {return c})}
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: Dimensions.get('window').width * 0.02,
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02,
        fontWeight: 'bold'
    },
    item: {
        height: Dimensions.get('window').height * 0.066,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Dimensions.get('window').height,
        paddingHorizontal: Dimensions.get('window').width*0.02,
        marginVertical: Dimensions.get('window').height*0.01
    },
    image: {
        width: Dimensions.get('window').width*0.08,
        height: Dimensions.get('window').width*0.08,
        margin: Dimensions.get('window').width*0.01,
        tintColor:'white'
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
});

export default PickerElement;