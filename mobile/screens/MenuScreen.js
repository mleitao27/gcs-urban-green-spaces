/* 
 * MenuScreen (Component)
 * Description : Mounted on the main screen and contains the app's menu
 * Props :
 * - navigation : navigation object used to navigate between the app's screens
 * - email : logged user's e-mail
 * - language : language code selected by the user
 */

// Imports
import React from 'react';
import { View } from 'react-native';

import Colors from '../constants/colors';

import CustomButton from '../components/CustomButton';

import dictionary from '../data/dictionary.json';

import config from '../extension/config';

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const MenuScreen = props => {
    
    /************************************************
     * FUNCTIONS
    ************************************************/

    // Logs user out of the system
    const logout = async () => {
        // Logout from the server
        const res = await fetch(`${config.serverURL}/api/users/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.email
            })
        });
        // Logs user out of the app by forgetting its e-mail and password
        props.onLogout(false, '', '');
    };
    
    /************************************************
     * RENDER
    ************************************************/
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
                title={dictionary[props.language].LOGOUT}
                onPress={logout}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
        </View>
    );
};

// Export component
export default MenuScreen;