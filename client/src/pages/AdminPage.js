/* 
 * AdminPage (Component)
 * Description : Page presented to the administrator user type
 * Props :
 * - onLogout: function that changes the login flag 'isLogged' to false if the user is logged out
 * - isLogged: boolean flag indicating if the user is logged in or not
 * - adminEmail: email of the administrator logged
 */

 //Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ExpiredSessionPage from './ExpiredSessionPage';
import UserList from '../components/UserList';
import config from '../extension/config';
import MainButton from '../components/MainButton';
/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const AdminPage = props => {

    /************************************************
     * STATES
     ************************************************/
    // User list state
    const [userList, setUserList] = useState([]);
    // Dummy state to force render
    const [dummyState, setDummyState] = useState(true);

    /************************************************
     * FUNCTIONS
    ************************************************/
    // Render user list when button clicked
    const renderUserList = () => {
        // Admin email to send to server
        const params = {adminEmail: props.adminEmail};
        // Get user list from server
        axios.post(`${config.serverURL}/api/users/`, params)
        .then(res => {
            // If successful set user list
            setUserList(res.data);
        })
        .catch(error => {
            console.log(error);
            // If admin logged out reset session state
            if (error.response.status === 403)
                props.onLogout(false, '', '');
        });
    };
    
    // Changes a user's type
    const changeUserType = (email, type) => {

        // Contains user email and new type and admin credential (id/email)
        const params = {
            email: email,
            type: type,
            adminEmail: props.adminEmail
        };

        // Sends data to server to update db
        axios.post(`${config.serverURL}/api/users/changeType`, params)
        .then(res => {
            // In case of success force render
            setDummyState(!dummyState);
        })
        .catch(error => {
            console.log(error);
            // If admin logged out reset session state
            if (error.response.status === 403)
                props.onLogout(false, '', '');
        });
    };

    // Removes user from system
    const removeUser = (emailDelete) => {
        // Asks admin to confirm operation with password
        const adminPassword = prompt('Re-enter your admin password:');
        // Conatains user to be deleted and admin's credentials
        const params = {
            emailDelete,
            adminPassword,
            adminEmail: props.adminEmail
        }

        // Sends data to server to delete user from db
        axios.post(`${config.serverURL}/api/users/remove`, params)
        .then(res => {
            // In case of success force render
            setDummyState(!dummyState);
        })
        .catch(error => {
            console.log(error);
            // if incorrect admin password
            if (error.response.status === 401)
                alert('ERROR : Incorrect admin password.');
            // If admin logged out reset session state
            else if (error.response.status === 403)
                props.onLogout(false, '', '');
        });
    };

    /************************************************
     * PRE-RENDER
     ************************************************/

    // Get user list from server
    //after first render, each refresh and admin operation
    useEffect(() => {
        const params = {adminEmail: props.adminEmail};
        axios.post(`${config.serverURL}/api/users/`, params)
        .then(res => {
            setUserList(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [dummyState, props.adminEmail]);

    // Default content with user list and refresh button
    let content = (
        <React.Fragment>
            <UserList userList={userList} changeUserType={changeUserType} removeUser={removeUser}/>
            <MainButton title='USER LIST' onClick={renderUserList} />
        </React.Fragment>
    );

    // Fallout text for empty user list
    if (userList.length === 0)
        content = (
            <React.Fragment>
                <h3>No users found in the database!</h3>
                <MainButton title='USER LIST' onClick={renderUserList} />
            </React.Fragment>
        );

    if (!props.isLogged)
        content = <ExpiredSessionPage />;
        
    /************************************************
     * RENDER
     ************************************************/
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};

export default AdminPage;