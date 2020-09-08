/* 
 * LogoutPage (Component)
 * Description : Page presented when the user logs out
 * Props :
 * - onLogout: function that changes the login flag 'isLogged' to false if the user is logged out
 * - isLogged: boolean flag indicating if the user is logged in or not
 * - userEmail: email of the user 
 */

 //Imports
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import config from '../extension/config';
import MainButton from '../components/MainButton';
/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const LogoutPage = props => {
    
    /************************************************
     * FUNCTIONS
    ************************************************/
    // When logout button click
    const logout = () => {
        // Reset session state parameters
        props.onLogout(false, '', '');

        const params = {email: props.userEmail};

        // Deletes user from cache
        axios.post(`${config.serverURL}/api/users/logout`, params)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    /************************************************
     * PRE-RENDER
     ************************************************/

    // Default content with logout button
    let content = <MainButton title='Logout' onClick={logout}/>;

    // If user not logged redirect to main page
    if (!props.isLogged) content = <Redirect to='/' />;

    /************************************************
     * RENDER
     ************************************************/
    return (
        <React.Fragment>
            <div className='centerBox'>
                <h1>Sorry to see you leave.</h1>
                {content}
            </div>
        </React.Fragment>
    );
};

export default LogoutPage;