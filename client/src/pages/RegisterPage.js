/* 
 * RegisterPage (Component)
 * Description : Screen used to register a new user
 */

 //Imports
import React, { useState } from 'react';
import OAuthButtons from '../extension/OAuthButtons';
import axios from 'axios';

import config from '../extension/config';

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const Register = props => {

    /************************************************
     * STATES
     ************************************************/
    // States that store user input credentials
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /************************************************
     * FUNCTIONS
    ************************************************/
    // Update credential states
    const changeName = (enteredName) => {
        setName(enteredName.target.value);
    };

    const changePassword = (enteredPassword) => {
        setPassword(enteredPassword.target.value);
    };

    const changeEmail = (enteredEmail) => {
        setEmail(enteredEmail.target.value);
    };

    // When clicked the register button
    const register = (e) => {
        e.preventDefault();

        // Obj to send to server with user data
        const params = {
            'name': name,
            'password': password,
            'email': email,
            'type': 'normal'
        };

        // If user not registered yet, add user to system
        axios.post(`${config.serverURL}/api/users/register`, params)
        .then(res => {
            // If user succefully added to db
        })
        .catch(error => {
            // If user already found in db
            console.log(error);
            alert('Error : User already registered.');
        });

        // Empty input fields
        setName('');
        setPassword('');
        setEmail('');

    };

    /************************************************
     * RENDER
     ************************************************/
    return (
        <React.Fragment >
            <div className='formContainer'>
                <h1>REGISTER</h1>
                <form onSubmit={register} style={{marginTop: '6%'}}>
                    <input
                        className="input formElement"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={changeName} required
                    /><br/>
                    <input
                        className="input formElement"
                        type="text"
                        name="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={changeEmail} required
                    /><br/>
                    <input
                        className="input formElement"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={changePassword} required
                    /><br/>
                    <input
                        className="formElement submit"
                        type="submit"
                        value="Register"
                    />
                </form>
                <OAuthButtons method={'register'}/>
            </div>
        </React.Fragment>
    );
};

export default Register;