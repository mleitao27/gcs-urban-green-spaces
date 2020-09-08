/* 
 * MainButton (Component)
 * Description : Simple button used across client platform
 * Props :
 * - onClick: Function activated when button is pressed
 * - title: Text to be presented on the button
 */

 //Imports
import React from 'react';

/************************************************
 * 
 * COMPONENT - Button
 * 
 ************************************************/
const MainButton = props => {
    
    /************************************************
     * RENDER
     ************************************************/
    return (
        <div style={styles.container}>
            <button className="mainButton" onClick={props.onClick}>{props.title}</button>
        </div>
    );
};

/************************************************
 * STYLES
 ************************************************/
const styles = {
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }
};

export default MainButton;