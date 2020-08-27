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
import {
    View,
    StyleSheet, 
    Dimensions,
    Image,
    Text,
    SafeAreaView
} from 'react-native';

import Colors from '../constants/colors';

import CustomButton from '../components/CustomButton';

import dictionary from '../data/dictionary.json';

import config from '../extension/config';

import dictionaryExtension from '../extension/dictionaryExtension.json';

import globalStyles from '../constants/globalStyles';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
     * PRE - RENDER
    ************************************************/

    // Check if welcome text is provided
    let welcomeContent = <View/>;
    if (typeof dictionaryExtension[props.language].WELCOME !== 'undefined')
        welcomeContent = <Text style={styles.text}>{dictionaryExtension[props.language].WELCOME}</Text>
    
    /************************************************
     * RENDER
    ************************************************/
    return (
        <SafeAreaView style={globalStyles.androidSafeArea}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/landing_logo.png')} />
                </View>

                <View style={{...styles.textContainer, ...styles.welcomeTextContainer}}>
                    {welcomeContent}
                </View>
                <View style={{flex:1, width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingBottom: windowHeight*0.03}}>
                    <View style={{height:'75%',justifyContent: 'space-between', width: '100%', alignItems: 'center',}}>
                        <CustomButton
                            title={dictionary[props.language].PROFILE}
                            onPress={() => props.navigation.navigate({routeName: 'Profile', params: {email: props.email, logout: logout, language: props.language}})}
                            backgroundColor={'white'}
                            shadow={true}
                            textColor={'black'}
                            height={windowHeight*0.1}
                            width={windowWidth*0.85}
                            bold={true}
                            />
                        <CustomButton
                            title={dictionary[props.language].SURVEY}
                            onPress={() => props.navigation.navigate({routeName: 'Survey', params: {email: props.email, logout: logout, language: props.language}})}
                            backgroundColor={'white'}
                            shadow={true}
                            textColor={'black'}
                            height={windowHeight*0.1}
                            width={windowWidth*0.85}
                            bold={true}
                            />
                        <CustomButton
                            title={dictionary[props.language].RESULTS}
                            onPress={() => props.navigation.navigate({routeName: 'Results', params: {email: props.email, logout: logout, language: props.language}})}
                            backgroundColor={'white'}
                            shadow={true}
                            textColor={'black'}
                            height={windowHeight*0.1}
                            width={windowWidth*0.85}
                            bold={true}
                            />
                    </View>
                    <CustomButton
                        title={dictionary[props.language].LOGOUT}
                        onPress={logout}
                        backgroundColor={'white'}
                        textColor={'black'}
                        underline={true}
                        />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...globalStyles.screen,
        justifyContent: 'flex-start'
    },
    imageContainer: {
        width: (windowHeight + windowWidth) * 0.25,
        height: (windowHeight + windowWidth) * 0.15,
        marginVertical: windowHeight * 0.03
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    welcomeTextContainer: {
        marginBottom: windowHeight * 0.03,
        width: '85%'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: (windowWidth + windowHeight) * 0.012,
        textAlign: 'center'
    },
});

// Export component
export default MenuScreen;