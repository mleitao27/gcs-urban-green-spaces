/* 
 * MainScreen (Component)
 * Description : Holds the login screen initially and menu screen after the user
 * logs into system
 * Props :
 * - navigation : navigation object used to navigate between the app's screens
 */

// Imports
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard

} from 'react-native';

import globalStyles from '../constants/globalStyles';
import Colors from '../constants/colors';

import MenuScreen from './MenuScreen';
import CustomButton from '../components/CustomButton';
import LanguagePicker from '../components/LanguagePicker';

import dictionary from '../data/dictionary.json';

import OAuthButtons from '../extension/OAuthButtons';
import config from '../extension/config';
import dictionaryExtension from '../extension/dictionaryExtension.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const MainScreen = props => {

    /************************************************
     * STATES
     ************************************************/
    const [isLogged, setIsLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState('en');

    /************************************************
     * FUNCTIONS
    ************************************************/
    
    // Changes the logged state (true if logged, false if not logged)
    // Stores login credential (email + password)
    const changeLoggedState = (state, email, password) => {
        setIsLogged(state);
        setEmail(email);
        setPassword(password);
    };

    // Handles input from email field
    const emailInputHandler = (enteredEmail) => {
        setEmail(enteredEmail);
    };

    // Handles input from the password field
    const passwordInputHandler = (enteredPassword) => {
        setPassword(enteredPassword);
    };

    // Logs in with the server
    const login = async () => {

        // Trim email and password to check if all fields were filled
        if (email.trim() !== '' && password.trim() !== '') {
            const res = await fetch(`${config.serverURL}/api/users/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    email: email
                })
            });
            
            // If user not registered on the system
            if (res.status == 404)
                Alert.alert(dictionary[language].ERROR, dictionary[language].NOT_USER);
            else
                changeLoggedState(true, email, password);
        } else {
            Alert.alert(dictionary[language].ERROR, dictionary[language].FIELDS_NOT_FILLED);
        }

    };

    /************************************************
     * PRE-RENDER
    ************************************************/

    // Check if welcome text is provided
    let welcomeContent = <View/>;
    if (typeof dictionaryExtension[language].WELCOME !== 'undefined')
        welcomeContent = <Text style={globalStyles.title}>{dictionaryExtension[language].WELCOME}</Text>

    // Initial screen content is login form
    let content = (
        <View style={globalStyles.screen} >
            {welcomeContent}
            <View style={globalStyles.formContainer}>
                <TextInput
                    style={globalStyles.formElement}
                    placeholder={dictionary[language].EMAIL}
                    placeholderTextColor={Colors.secondary}
                    value={email}
                    onChangeText={emailInputHandler}
                    />
                <TextInput
                    style={globalStyles.formElement}
                    placeholder={dictionary[language].PASSWORD}
                    placeholderTextColor={Colors.secondary}
                    value={password}
                    onChangeText={passwordInputHandler}
                    secureTextEntry={true}
                    />
                <CustomButton
                    title={dictionary[language].LOGIN}
                    onPress={login}
                    backgroundColor={Colors.secondary}
                    textColor={Colors.primary}
                    />
                <OAuthButtons method={'login'} onLogin={changeLoggedState} language={language} />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{dictionary[language].NOT_REGISTERED} </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate({routeName: 'Register', params: {language: language}})}>
                        <Text style={[styles.text, styles.textUnderline]}>{dictionary[language].CLICK_HERE}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <LanguagePicker
                language={language}
                setLanguage={newLanguage => setLanguage(newLanguage)}
            />
        </View>
    );

    // If user is logged render the menu screen
    if (isLogged)
        content = <MenuScreen navigation={props.navigation} onLogout={changeLoggedState} email={email} language={language}/>;

    /************************************************
     * RENDER
     ************************************************/
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.screen} >
                {content}        
            </View>
        </TouchableWithoutFeedback>
    );
};

// Styles
const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.secondary,
        fontSize: windowWidth * 0.04
    },
    textUnderline: {
        textDecorationLine: 'underline'
    }
});

// Change in navigation options
// To change the screen's header title
MainScreen.navigationOptions = (navData) => {
    return (
        {
            headerTitle: 'Crowdsourcing'
        }
    );
};

// Export Screen
export default MainScreen;