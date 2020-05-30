import React, { useEffect } from 'react';

import { View } from 'react-native';

import Colors from '../../constants/colors';
import config from '../../extension/config';

import CustomButton from '../CustomButton';

const UserScreen = props => {
    
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
                title='Profile'
                onPress={() => props.navigation.navigate({routeName: 'Profile'})}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
            <CustomButton
                title='Survey'
                onPress={() => props.navigation.navigate({routeName: 'Form', params: {email: props.email}})}
                backgroundColor={Colors.primary}
                textColor={Colors.secondary}
                />
            <CustomButton
                title='Results'
                onPress={() => props.navigation.navigate({routeName: 'Results'})}
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

export default UserScreen;