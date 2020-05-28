import React from 'react';
import { Redirect } from 'react-router-dom';

const LandingPage = props => {

    // Default content
    let content = <React.Fragment><h1>LandingPage</h1></React.Fragment>;

    // If admin is logged
    if (props.isLogged && props.userType === 'admin')
        content = <Redirect to='/admin' />;
    // If researcher is logged
    if (props.isLogged && props.userType === 'researcher')
    content = <Redirect to='/researcher' />;
    
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};

export default LandingPage;