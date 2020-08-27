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
    Keyboard,
    Image,
    SafeAreaView
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
        welcomeContent = <Text style={styles.text}>{dictionaryExtension[language].WELCOME}</Text>

    // Initial screen content is login form
    let content = (
        <SafeAreaView style={globalStyles.androidSafeArea}>
            <View style={styles.container} >

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/landing_logo.png')} />
                </View>

                <View style={{...styles.textContainer, ...styles.welcomeTextContainer}}>
                    {welcomeContent}
                </View>

                <View style={styles.formContainer}>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={dictionary[language].EMAIL}
                            placeholderTextColor={Colors.secondary}
                            value={email}
                            onChangeText={emailInputHandler}
                            />
                        <TextInput
                            style={styles.input}
                            placeholder={dictionary[language].PASSWORD}
                            placeholderTextColor={Colors.secondary}
                            value={password}
                            onChangeText={passwordInputHandler}
                            secureTextEntry={true}
                            />
                    </View>

                    <CustomButton
                        title={dictionary[language].LOGIN}
                        onPress={login}
                        backgroundColor={Colors.primary}
                        textColor={'white'}
                        width={windowWidth*0.60}
                        height={windowHeight*0.045}
                        borderRadius={10}
                        />
                </View> 

                <View style={styles.loginTextContainer}>
                    <Text style={styles.text}>{dictionary[language].OR_LOGIN}</Text>
                </View>
                
                <View style={{width:windowWidth * 0.35, marginBottom: windowHeight * 0.05,}}>
                    <OAuthButtons method={'login'} onLogin={changeLoggedState} language={language} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{dictionary[language].NOT_REGISTERED} </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate({routeName: 'Register', params: {language: language}})}>
                        <Text style={{...styles.text, ...styles.textUnderline}}>{dictionary[language].CLICK_HERE}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.languagePicker}>
                    <LanguagePicker
                        language={language}
                        setLanguage={newLanguage => setLanguage(newLanguage)}
                    />
                </View>

            </View>
        </SafeAreaView>
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
    formContainer: {
        marginBottom: windowHeight * 0.02,
        alignItems: 'center'
    },
    inputContainer: {
        marginBottom: windowHeight * 0.02
    },
    input: {
        ...globalStyles.formElement, 
        ...globalStyles.shadow, 
        marginBottom: windowHeight * 0.01,
        fontSize: (windowWidth + windowHeight) * 0.012,
    },
    loginTextContainer: {
        marginVertical: windowHeight * 0.01
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
    textUnderline: {
        textDecorationLine: 'underline'
    },
    languagePicker: {
        position: 'absolute', 
        right: 0, 
        top: windowHeight * 0.01
    },
});

// Change in navigation options
// To change the screen's header title
MainScreen.navigationOptions = (navData) => {
    return (
        {
            headerShown: false
        }
    );
};

// Export Screen
export default MainScreen;