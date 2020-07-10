import React, { useEffect, useState } from 'react';

import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import config from '../extension/config';

import CustomButton from '../components/CustomButton';

import dictionary from '../data/dictionary.json';

const MenuScreen = props => {
    
    const logout = async () => {
        const res = await fetch(`${config.serverURL}/api/users/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.email
            })
        });
        
        props.onLogout(false, '', '');
    };
    
    return (
        <View>
            <CustomButton
                title={dictionary[props.language].PROFILE}
                onPress={() => props.navigation.navigate({routeName: 'Profile', params: {email: props.email, logout: logout, language: props.language}})}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
            <CustomButton
                title={dictionary[props.language].SURVEY}
                onPress={() => props.navigation.navigate({routeName: 'Survey', params: {email: props.email, logout: logout, language: props.language}})}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
            <CustomButton
                title={dictionary[props.language].RESULTS}
                onPress={() => props.navigation.navigate({routeName: 'Results', params: {email: props.email, logout: logout, language: props.language}})}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
            <CustomButton
                title='Logout'
                onPress={logout}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
        </View>
    );
};

export default MenuScreen;