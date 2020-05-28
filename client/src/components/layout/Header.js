import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {

    // Default content (not logged)
    let content = (
        <React.Fragment>
            <Link to="/register" style={styles.link}>Register</Link> | <Link to="/login" style={styles.link}>Login</Link>
        </React.Fragment>
    );

    // If user is logged
    if (props.isLogged) {
        content = (
            <Link to="/logout" style={styles.link}>Logout</Link>
        );
    }
     
    return (
        <header style={styles.header}>
            <h1>Crowdsourcing</h1>
            <Link to="/" style={styles.link}>Home</Link> | {content}
        </header>
    );
};

// Styling
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