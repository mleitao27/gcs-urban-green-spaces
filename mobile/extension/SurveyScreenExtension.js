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

import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import SurveyFormScreen from './surveys/SurveyFormScreen';
import SurveyMapScreen from './surveys/SurveyMapScreen';


const SurveyScreenExtension = props => {

    const [mode, setMode] = useState('form');

    let content = <View/>;
    if (mode === 'form') content = <SurveyFormScreen navigation={props.navigation} />;
    else if (mode === 'map') content = <SurveyMapScreen navigation={props.navigation} />;
    
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