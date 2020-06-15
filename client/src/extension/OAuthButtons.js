import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import PropTypes from 'prop-types';

import config from './config';

const OAuthButtons = props => {

    // Check if used in register or login
    var buttonText = 'Login with ';
    if (props.method === 'register')
        buttonText = 'Register with '

    
    // Send user params to server to login/register
    const oauthServerConnection = (params) => {
        axios.post(`${config.serverURL}/api/oauth/${props.method}`, params)
        .then(res => {
            // If login set session state parameters
            if (props.method === 'login') {
                props.onLogin(true, params.email, res.data.type);
            }
        })
        .catch(error => {
            console.log(error);
            // Handle register errors
            if (props.method === 'register') {
                if (error.response.status === 302) alert('ERROR : Account already registered with this e-mail.');
                else alert('ERROR : Something went wrong with the register.');
            } 
            // Handle login errors
            else if (props.method === 'login') {
                if (error.response.status === 404) alert('ERROR : Account not registered yet.');
                else alert('ERROR : Something went wrong with the login.');
            }
        });
    };
    
    // When registering with google
    const responseGoogle = (response) => {
        // If google login window closed by user
        if ('error' in response)
            if(response.error === 'popup_closed_by_user')
                return;

        // Get user info from google response
        const params = {
            'platform': 'google',
            'id': config.credentials.google.clientId,
            'token': response.tokenId,
            'user': response.Ca,
            'name': response.Rt.Ad,
            'email': response.Rt.Au,
            'type': 'pending'
        };

        // Login or register user with server
        oauthServerConnection(params);
    };

    // When registering with facebook
    const responseFacebook = (response) => {

        // If facebook login window closed by user
        if ('status' in response)
            if (response.status === 'unknown')
                return;

        // Get user info from facebook response
        const params = {
            'platform': 'facebook',
            'id':config.credentials.facebook.appId,
            'token':response.accessToken,
            'user': response.id,
            'name': response.name,
            'email': response.email
        };

        // Login or register user with server
        oauthServerConnection(params);
    };
    
    return (
        <React.Fragment>
            <GoogleLogin
                className="googleButton formElement"
                clientId={config.credentials.google.clientId}
                buttonText={`${buttonText} Google`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /><br/>
            <FacebookLogin
                appId={config.credentials.facebook.appId}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebookButton formElement"
                icon="fa-facebook"
                textButton={`${buttonText} Facebook`}
            />
        </React.Fragment>
    );
};

// Validation: PropTypes
OAuthButtons.propTypes = {
    method: PropTypes.string.isRequired
}

export default OAuthButtons;