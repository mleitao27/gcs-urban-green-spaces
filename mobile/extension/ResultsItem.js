import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import Colors from '../constants/colors';

const ResultsItem = props => {

    let content = <View />;
    if (props.data.done === true) {
        const date = new Date(props.data.timestamp);
        content = (
            <View style={styles.container}>
                <Text>{props.data.data.find(d => d.name === 'In which UGS are you?').value}</Text>
                <Text>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} at {date.getHours()}:{date.getMinutes()}</Text>
            </View>
        );
    }

    return (
        <View style={{alignItems: 'center'}}>
            {content}
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
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Dimensions.get('window').height * 0.03
    }
});

export default ResultsItem;