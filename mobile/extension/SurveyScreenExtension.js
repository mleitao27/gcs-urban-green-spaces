import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import {Form} from 'react-native-json-forms';
import FormExtension from './FormExtension';

import FeedbackHandler from './FeedbackHandler';

import config from './config';
import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import FormScreen from './FormScreen';

const SurveyScreenExtension = props => {

    const [mode, setMode] = useState('form');

    let content = <View/>;
    if (mode === 'form') content = <FormScreen navigation={props.navigation} />;
    
    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={{...styles.iconContainer, ...{backgroundColor: mode === 'form' ? Colors.primary : Colors.secondary}}} onPress={() => setMode('form')}>
                    <Ionicons name="md-paper" size={24} color={mode === 'form' ? Colors.secondary : Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.iconContainer, ...{backgroundColor: mode === 'map' ? Colors.primary : Colors.secondary}}} onPress={() => setMode('map')}>
                    <Ionicons name="md-map" size={24} color={mode === 'map' ? Colors.secondary : Colors.primary} />
                </TouchableOpacity>
            </View>
            {content}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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

export default SurveyScreenExtension;