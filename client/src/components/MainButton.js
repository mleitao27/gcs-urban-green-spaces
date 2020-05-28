import React from 'react';

const MainButton = props => {
    return (
        <div style={styles.container}>
            <button className="mainButton" onClick={props.onClick}>{props.title}</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }
};

export default MainButton;