/* 
 * ExpiredSessionPage (Component)
 * Description : To be presented when the login session is expired
 * Props :
 * - onLogout: function that changes the login flag 'isLogged' to false if the user is logged out
 * - isLogged: boolean flag indicating if the user is logged in or not
 * - userEmail: email of the current user
 */

 //Imports
import React from 'react';
import { Link } from 'react-router-dom';

import MainButton from '../components/MainButton';

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const ExpiredSessionPage = props => {
    
    /************************************************
     * RENDER
     ************************************************/
    return (           
            <div className='centerBox'>
                <h1>Sorry, your session expired.</h1>
                <Link to="/login"><MainButton title='Back to Login Page'/></Link>
            </div>
    );
};

export default ExpiredSessionPage;