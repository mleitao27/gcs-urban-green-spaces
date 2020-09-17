// Imports
import React, { useState } from 'react';
import {
    View,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import globalStyles from '../constants/globalStyles';
import Colors from '../constants/colors';

import OAuthButtons from '../extension/OAuthButtons';
import CustomButton from '../components/CustomButton';

import dictionary from '../data/dictionary.json';

import config from '../extension/config';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const RegisterScreen = props => {

    /************************************************
     * STATES
     ************************************************/
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /************************************************
     * FUNCTIONS
    ************************************************/

    // Handles input from the name field
    const nameInputHandler = (enteredName) => {
        setName(enteredName);
    };

    // Handles input from the e-mail field
    const emailInputHandler = (enteredEmail) => {
        setEmail(enteredEmail);
    };

    // Handles input from the password field
    const passwordInputHandler = (enteredPassword) => {
        setPassword(enteredPassword);
    };
    
    // Registers user with the server
    const register = async () => {

        // Trim email and password to check if all fields were filled
        if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
            const res = await fetch(`${config.serverURL}/api/users/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    email: email,
                    type: 'normal'
                })
            });
    
            // If user already registered with inserted e-mail
            if (res.status == 302)
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].ALREADY_USER);
            else
                // Go back one screen (MainScreen with login form)
                props.navigation.pop();
        } else {
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionary[props.navigation.state.params.language].FIELDS_NOT_FILLED);
        }
    };
    
    /************************************************
     * RENDER
     ************************************************/
    return (
        <SafeAreaView style={globalStyles.androidSafeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>

                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../assets/landing_logo.png')} />
                    </View>

                    <View style={styles.oauthContainer}>
                        <OAuthButtons method={'register'} navigation={props.navigation} language={props.navigation.state.params.language}/>
                    </View>

                    <View style={styles.lineContainer}>
                        <Image style={styles.image} source={require('../assets/register_line.png')} />
                        <Text style={{...styles.text, ...styles.orText}}>{dictionary[props.navigation.state.params.language].OR}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{dictionary[props.navigation.state.params.language].SIGN_UP}</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder={dictionary[props.navigation.state.params.language].NAME}
                                placeholderTextColor={Colors.secondary}
                                value={name}
                                onChangeText={nameInputHandler}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={dictionary[props.navigation.state.params.language].EMAIL}
                                placeholderTextColor={Colors.secondary}
                                value={email}
                                onChangeText={emailInputHandler}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={dictionary[props.navigation.state.params.language].PASSWORD}
                                placeholderTextColor={Colors.secondary}
                                value={password}
                                onChangeText={passwordInputHandler}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.registerButtonContainer}>
                            <CustomButton
                                title={dictionary[props.navigation.state.params.language].REGISTER}
                                onPress={register}
                                backgroundColor={Colors.primary}
                                textColor={'white'}
                                borderRadius={10}    
                            />
                        </View>

                    </View>
                </View>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles= StyleSheet.create({
    container: {
        ...globalStyles.screen,
        justifyContent: 'flex-start'
    },
    input: {
        ...globalStyles.formElement, 
        ...globalStyles.shadow, 
        marginBottom: windowHeight * 0.03,
        fontSize: (windowWidth + windowHeight) * 0.012,
    },
    imageContainer: {
        width: (windowHeight + windowWidth) * 0.20,
        height: (windowHeight + windowWidth) * 0.10,
        marginVertical: windowHeight * 0.03
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    lineContainer: {
        width: windowWidth * 0.85,
        height: (windowHeight + windowWidth) * 0.01,
        marginVertical: windowHeight * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight * 0.02,
    },
    text: {
        color: 'black',
        fontSize: (windowWidth + windowHeight) * 0.012,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    oauthContainer: {
        width:windowWidth * 0.85, 
        marginBottom: windowHeight * 0.01
    },
    orText: {
        position: 'absolute', 
        fontWeight: 'normal'
    },
    formContainer: {
        flex:1,
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    registerButtonContainer: {
        flex: 1, 
        justifyContent: 'center'
    }
});

// Change in navigation options
// To change the screen's header title
RegisterScreen.navigationOptions = (navData) => {
    return (
        {
            headerTitle: dictionary[navData.navigation.state.params.language].REGISTER
        }
    );
};

// Export screen
export default RegisterScreen;