/* 
 * ResearcherPage (Component)
 * Description : Page presented to the researcher user type
 * Props :
 * - onLogout: function that changes the login flag 'isLogged' to false if the user is logged out
 * - isLogged: boolean flag indicating if the user is logged in or not
 * - userEmail: email of the user 
 */

 //Imports
import React from 'react';
import ResearcherPageExtension from '../extension/ResearcherPageExtension';
/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const ResearcherPage = props => {
    
    /************************************************
     * RENDER
     ************************************************/
    return (
        <React.Fragment>
            <ResearcherPageExtension onLogout={props.onLogout} userEmail={props.userEmail} isLogged={props.isLogged}></ResearcherPageExtension>
        </React.Fragment>
    );
};

export default ResearcherPage;