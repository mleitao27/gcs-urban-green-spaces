import React from 'react';
import { IoIosRemoveCircle } from "react-icons/io";

const UserItem = props => {

    const toggleType = () => {
        if (props.user.type === 'normal') {
            props.changeUserType(props.user.email, 'researcher');
        }
        else if (props.user.type === 'researcher') {
            props.changeUserType(props.user.email, 'normal');
        }
    };

    return (
        <div style={styles.itemContainer}>
            <p style={{display: 'flex', alignItems: 'center'}}>{props.user.name}{' - '}{props.user.email}{' - '}{props.user.type}</p>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <label className="switch">
                    <input type="checkbox" onChange={toggleType} checked={props.user.type === 'researcher' ? true : false}/>
                    <span className="slider round"></span>
                </label>
                <IoIosRemoveCircle style={{color: '#cc0000', fontSize: 36}} onClick={props.removeUser.bind(this, props.user.email)}/>
            </div>
        </div>
    );
};

// Styling
const styles = {
    itemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderBottom: '1px #ccc dotted',
        fontSize: 16
    }
};

export default UserItem;