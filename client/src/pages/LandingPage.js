/* 
 * LandingPage (Component)
 * Description : Redirects the user according to its type on login
 * Props :
 * - isLogged: boolean flag indicating if the user is logged in 
 * - userType: indicates the type of user that is logged in, reasearcher or administrator
 */

// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';

import config from '../extension/config';

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const LandingPage = props => {

    /************************************************
     * PRE-RENDER
     ************************************************/
    // Default content
    let content = <React.Fragment><h1>LandingPage</h1></React.Fragment>;

    /************************************************
     * REDIRECT - ADMINPAGE
     ************************************************/
    // If admin is logged
    if (props.isLogged && props.userType === 'admin') content = <Redirect to={`${config.homepage}/admin`} />;

    /************************************************
     * REDIRECT - RESEARCHERPAGE
     ************************************************/
    // If researcher is logged
    if (props.isLogged && props.userType === 'researcher') content = <Redirect to={`${config.homepage}/researcher`} />;

    /************************************************
     * RENDER
     ************************************************/
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};

export default LandingPage;