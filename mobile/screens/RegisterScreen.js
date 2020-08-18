// Imports
import React, { useState } from 'react';
import {
    View,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import globalStyles from '../constants/globalStyles';
import Colors from '../constants/colors';

import OAuthButtons from '../extension/OAuthButtons';
import CustomButton from '../components/CustomButton';

import dictionary from '../data/dictionary.json';

import config from '../extension/config';

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.screen}>
                <View style={globalStyles.formContainer}>
                    <TextInput
                        style={globalStyles.formElement}
                        placeholder={dictionary[props.navigation.state.params.language].NAME}
                        placeholderTextColor={Colors.secondary}
                        value={name}
                        onChangeText={nameInputHandler}
                    />
                    <TextInput
                        style={globalStyles.formElement}
                        placeholder={dictionary[props.navigation.state.params.language].EMAIL}
                        placeholderTextColor={Colors.secondary}
                        value={email}
                        onChangeText={emailInputHandler}
                    />
                    <TextInput
                        style={globalStyles.formElement}
                        placeholder={dictionary[props.navigation.state.params.language].PASSWORD}
                        placeholderTextColor={Colors.secondary}
                        value={password}
                        onChangeText={passwordInputHandler}
                        secureTextEntry={true}
                    />
                    <CustomButton
                        title={dictionary[props.navigation.state.params.language].REGISTER}
                        onPress={register}
                        backgroundColor={Colors.secondary}
                        textColor={Colors.primary}    
                    />
                    <OAuthButtons method={'register'} navigation={props.navigation} language={props.navigation.state.params.language}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

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