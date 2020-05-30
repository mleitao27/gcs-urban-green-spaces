import React, {useState, useReducer} from 'react';
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

import config from '../../extension/config';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';

import CustomButton from '../CustomButton';
import UserScreen from './UserScreen';
import OAuthButtons from '../../extension/OAuthButtons';

const windowWidth = Dimensions.get('window').width;

const MainScreen = props => {

    const [isLogged, setIsLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const changeLoggedState = (state, email, password) => {
        setIsLogged(state);
        setEmail(email);
        setPassword(password);
    };

    const emailInputHandler = (enteredEmail) => {
        setEmail(enteredEmail);
    };

    const passwordInputHandler = (enteredPassword) => {
        setPassword(enteredPassword);
    };

    const login = async () => {

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
            
            if (res.status == 404)
                Alert.alert('ERROR', 'User not registered.');
            else
                changeLoggedState(true, email, password);
        } else {
            Alert.alert('ERROR', 'All fields must be filled');
        }

    };

    let content = (
        <View style={globalStyles.screen} >
            <Text style={globalStyles.title}>Welcome!</Text>
            <View style={globalStyles.formContainer}>
                <TextInput
                    style={globalStyles.formElement}
                    placeholder="E-mail"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={emailInputHandler}
                    />
                <TextInput
                    style={globalStyles.formElement}
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={passwordInputHandler}
                    secureTextEntry={true}
                    />
                <CustomButton
                    title='Login'
                    onPress={login}
                    backgroundColor={Colors.secondary}
                    textColor={Colors.primary}
                    />
                <OAuthButtons method={'login'} onLogin={changeLoggedState} />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Not registered yet? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate({routeName: 'Register'})}>
                        <Text style={[styles.text, styles.textUnderline]}>Click here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (isLogged)
        content = <UserScreen navigation={props.navigation} onLogout={changeLoggedState} email={email} />;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.screen} >
                {content}        
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row'
    },
    text: {
        color:'#ccc',
        fontSize: windowWidth*0.04
    },
    textUnderline: {
        textDecorationLine: 'underline'
    }
});

MainScreen.navigationOptions = (navData) => {
    return (
        {
            headerTitle: 'Crowdsourcing'
        }
    );
};

export default MainScreen;