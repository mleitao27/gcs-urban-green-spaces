import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native';

import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import ResultsFormScreen from './results/ResultsFormScreen';
import ResultsMapScreen from './results/ResultsMapScreen';

const ResultsScreenExtension = props => {

    const [mode, setMode] = useState('form');
    const [detail, setDetail] = useState(false);

    const onDetail = (value) => {
        if (value === true || value === false)
            setDetail(value);
    };

    let content = <View/>;
    if (mode === 'form') content = <ResultsFormScreen onDetail={onDetail} navigation={props.navigation} />;
    else if (mode === 'map') content = <ResultsMapScreen onDetail={onDetail} navigation={props.navigation} />;

    let buttonContent = (
        <View style={styles.btnContainer}>
            <TouchableOpacity style={{...styles.iconContainer, ...{backgroundColor: mode === 'form' ? 'black' : Colors.primary}}} onPress={() => setMode('form')}>
                <Ionicons name="md-paper" size={24} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.iconContainer, ...{backgroundColor: mode === 'map' ? 'black' : Colors.primary}}} onPress={() => setMode('map')}>
                <FontAwesome5 name="map-marked-alt" size={24} color={'white'} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {buttonContent}
            {content}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    btnContainer: {
        width: '100%',
        height: Dimensions.get('window').height*0.06,
        flexDirection: 'row'
    },
    iconContainer: {
        width: '50%',
        alignItems:'center',
        justifyContent: 'center'
    }
});

export default ResultsScreenExtension;