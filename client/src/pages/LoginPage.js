import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import OAuthButtons from'../extension/OAuthButtons';
import config from'../extension/config';

const LoginPage = props => {

    // States that store user input credentials
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Update credential states
    const changeEmail = (enteredEmail) => {
        setEmail(enteredEmail.target.value);
    };

    const changePassword = (enteredPassword) => {
        setPassword(enteredPassword.target.value);
    };

    // When clicked the login button
    const login = (e) => {
        e.preventDefault();

        // Obj to send to server with user credentials
        const params = {
            'email': email,
            'password': password
        };

        // Checks if user exists and logs in system
        axios.post(`${config.serverURL}/api/users/login`, params)
        .then(res => {
            // If user in db
            // Set session state parameters
            props.onLogin(true, params.email, res.data.type);
        })
        .catch(error => {
            // Reset session state
            console.log(error);
            props.onLogin(false, '', '');
            if (error.response.status === 404) alert('ERROR : User not registered.');
            else
                alert('ERROR : Unexpected error. Contact system admin.');
        });

        // Empty input fields
        setEmail('');
        setPassword('');

    };

    // Default content w/ login form
    let content = (
        <React.Fragment>
            <form onSubmit={login} style={{marginTop: '6%'}}>
                <input
                    className="input formElement"
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={changeEmail}
                /><br/>
                <input
                    className="input formElement"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                /><br/>
                <input
                    className="submit formElement"
                    type="submit"
                    value="Login"
                />
            </form>
            <OAuthButtons method={'login'} onLogin={props.onLogin} />
        </React.Fragment>
    );

    // If user logged go to main page
    if (props.isLogged) content = <Redirect to='/' />;

    return (
        <React.Fragment>
            <div className='formContainer'>
                <h1>LOGIN</h1>
                {content}
            </div>
        </React.Fragment>
    );
};

export default LoginPage;