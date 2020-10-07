/* 
 * Header (Component)
 * Description : Header to be rendered according to the logged state
 * Props :
 * - isLogged: boolean flag indicating if the user is logged in or not
 */

 //Imports
import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../extension/config';


/************************************************
 * 
 * COMPONENT - Header
 * 
 ************************************************/
const Header = props => {
    
    /************************************************
     * PRE-RENDER
     ************************************************/
    // Default content (not logged)
    let content = (
        <React.Fragment>
            <Link to={`${config.homepage}/register`} style={styles.link}>Register</Link> | <Link to={`${config.homepage}/login`} style={styles.link}>Login</Link>
        </React.Fragment>
    );

    // If user is logged
    if (props.isLogged) {
        content = (
            <Link to={`${config.homepage}/logout`} style={styles.link}>Logout</Link>
        );
    }
    
    /************************************************
     * RENDER
     ************************************************/
    return (
        <header style={styles.header}>
            <h1>Crowdsourcing</h1>
            <Link to={`${config.homepage}`} style={styles.link}>Home</Link> | {content}
        </header>
    );
};

/************************************************
 * STYLES
 ************************************************/
const styles = {
    header: {
        background: '#333',
        color: '#ccc',
        textAlign: 'center',
        padding: 10
    },
    link: {
        color: '#ccc',
        textDecoration: 'none'
    }
};

export default Header;