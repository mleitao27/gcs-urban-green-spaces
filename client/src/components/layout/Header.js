/* 
 * Header (Component)
 * Description : Header to be rendered according to the logged state
 * Props :
 * - isLogged: boolean flag indicating if the user is logged in or not
 */

 //Imports
import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/ugs/client/register" style={styles.link}>Register</Link> | <Link to="/ugs/client/login" style={styles.link}>Login</Link>
        </React.Fragment>
    );

    // If user is logged
    if (props.isLogged) {
        content = (
            <Link to="/ugs/client/logout" style={styles.link}>Logout</Link>
        );
    }
    
    /************************************************
     * RENDER
     ************************************************/
    return (
        <header style={styles.header}>
            <h1>Crowdsourcing</h1>
            <Link to="/ugs/client/" style={styles.link}>Home</Link> | {content}
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