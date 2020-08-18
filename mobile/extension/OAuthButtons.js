/* 
 * OAuthButtons (Component)
 * Description : Buttons in the login and register screen that handle
 * the oauth authentication 
 * Props :
 * - navigation : navigation object used to navigate between the app's screens
 * - language : language code selected by the user
 * - method : identifies if buttons are used for 'login' or 'register'
 * - onLogin : logs user by setting email e password states in the app
 */

// Imports
import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Alert,
  Platform,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import config from './config';
import dictionaryExtension from './dictionaryExtension.json';
import dictionary from '../data/dictionary.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT
 * 
 ************************************************/
const OAuthButtons = props => {

  /************************************************
   * FUNCTIONS
   ************************************************/
  // Called when selected oauth with Facebook
  const facebookResponse = async () => {
    try {
      // Connects with facebook
      await Facebook.initializeAsync(config.credentials.facebook.appId);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      // If connection successful
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=email,name&access_token=${token}`);
        const data = await response.json();
        const params = {
          'platform': 'facebook',
          'id': config.credentials.facebook.appId,
          'token': token,
          'user': data.id,
          'name': data.name,
          'email': data.email,
          'type': 'normal'
        };
        // Uses Facebook credentials to authenticate with server
        oauthServerConnection(params);
      } else {
        // type === 'cancel'
        console.log("cancelled");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  // Called when selected oauth with Google
  const googleResponse = async () => {
    try {
      // Logs in Google
      const result = await Google.logInAsync({
        androidClientId: config.credentials.google.androidClientId,
        iosClientId: config.credentials.google.iosClientId,
        scopes: ["profile", "email"]
      });
      
      // If login successfull
      if (result.type === "success") {
        const params = {
          'platform': 'google',
          'id': config.credentials.google.androidClientId,
          'token': result.idToken,
          'user': result.user.id,
          'name': result.user.name,
          'email': result.user.email,
          'type': 'normal'
        };
        // Uses Google credentials to authenticate with server
        oauthServerConnection(params);
      } else {
        // If user closes pop up window
        console.log("cancelled");
      }
    } catch (e) {
      // Session errors
      console.log("error", e);
    }
  };

  // Handles authentication with server after getting credentials from Google and Facebook
  const oauthServerConnection = async (params) => {
    // Sends credentials and keys to the server
    const res = await fetch(`${config.serverURL}/api/oauth/${props.method}`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    // Handle register response
    if (props.method === 'register') {
      // If successful registration
      if (res.status === 201) props.navigation.pop();
      else if (res.status === 302) Alert.alert(dictionary[props.language].ERROR, dictionary[props.language].ALREADY_USER);
      else Alert.alert(dictionary[props.language].ERROR, dictionaryExtension[props.language].REGISTER_ERROR);
    } 
    // Handle login response
    else if (props.method === 'login') {
      // If successful login
        if (res.status === 200) props.onLogin(true, params.email, '');
        else if (res.status === 404) Alert.alert(dictionary[props.language].ERROR, dictionary[props.language].NOT_USER);
        else Alert.alert(dictionary[props.language].ERROR, dictionaryExtension[props.language].LOGIN_ERROR);
    }
  };

  /************************************************
   * PRE-RENDER
   ************************************************/
  // Changes button text according language and method
  let method = dictionaryExtension[props.language].OAUTH_LOGIN;
  if (props.method === 'register') method = dictionaryExtension[props.language].OAUTH_REGISTER;

  // By default the button is a TouchableOpacity
  let ButtonComponent = TouchableOpacity;
  // If android and version > = 21 button is TouchableNativeFeedback
  if (Platform.OS === 'android' && Platform.Version >= 21) {
      ButtonComponent = TouchableNativeFeedback;
  }

  /************************************************
   * RENDER
   ************************************************/
  return (
    <View>
      <View style={styles.buttonContainer}>
        <ButtonComponent activeOpacity={0.6} onPress={googleResponse}>
          <View style={[styles.button, styles.googleButton]}>
            <Image style={styles.icon} source={require('../assets/google.jpeg')} />
            <Text style={styles.googleButtonText}>{method} Google</Text>
          </View>
        </ButtonComponent>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonComponent activeOpacity={0.6} onPress={facebookResponse}>
          <View style={[styles.button, styles.facebookButton]}>
            <Image style={styles.icon} source={require('../assets/facebook.svg')} />
            <Text style={styles.facebookButtonText}>{method} Facebook</Text>
          </View>
        </ButtonComponent>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.55,
    height: windowHeight * 0.06,
    paddingRight: windowHeight * 0.02,
    paddingLeft: windowHeight * 0.01
  },
  googleButton: {
    backgroundColor: 'white'
  },
  googleButtonText: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    width: windowWidth * 0.4
  },
  icon: {
    height: windowHeight * 0.04,
    width: undefined,
    aspectRatio: 1/1
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    paddingLeft: 0
  },
  facebookButtonText: {
    fontSize: windowWidth * 0.04,
    color: 'white',
    width: windowWidth * 0.4
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: '2%'
  }
});

// Export component
export default OAuthButtons;