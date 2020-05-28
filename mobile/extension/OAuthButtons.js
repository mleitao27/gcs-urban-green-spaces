import React from 'react';
import {
  Button,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OAuthButtons = props => {

  let method = 'Login with';
  if (props.method === 'register') method = 'Register w/';

  const oauthServerConnection = async (params) => {
    const res = await fetch(`${config.serverURL}/api/users/oauth/${props.method}`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (props.method === 'register') {
      if (res.status === 201) props.navigation.pop();
      else if (res.status === 302) Alert.alert('ERROR', 'Account already registered with this e-mail.');
      else Alert.alert('ERROR', 'Something went wrong with the register.');
    } 
    // Handle login errors
    else if (props.method === 'login') {
        if (res.status === 200) props.onLogin(true, params.email, '');
        else if (res.status === 404) Alert.alert('ERROR', 'Account not registered yet.');
        else Alert.alert('ERROR', 'Something went wrong with the login.');
    }
};

  const facebookResponse = async () => {
    try {
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
        oauthServerConnection(params);
      } else {
        // type === 'cancel'
        console.log("cancelled");
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleResponse = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: config.credentials.google.androidClientId,
        iosClientId: config.credentials.google.iosClientId,
        scopes: ["profile", "email"]
      })
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

  let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

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

export default OAuthButtons;