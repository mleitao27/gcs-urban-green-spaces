/* 
 * UserItem (Component)
 * Description : Representation of each user allowing the possibility to toggle between existing user types
 * Props :
 * - user: Array of informations about a specific user
 * - changeUserType: Function that toggles between user types
 * - removeUser: Function that removes a specific user from the DB 
 */

 //Imports
import React from 'react';
import { IoIosRemoveCircle } from "react-icons/io";

/************************************************
 * 
 * COMPONENT - Item
 * 
 ************************************************/
const UserItem = props => {

    /************************************************
     * FUNCTIONS
     ************************************************/
    const toggleType = () => {
        if (props.user.type === 'normal') {
            props.changeUserType(props.user.email, 'researcher');
        }
        else if (props.user.type === 'researcher') {
            props.changeUserType(props.user.email, 'normal');
        }
    };
    
    /************************************************
     * RENDER
     ************************************************/
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

/************************************************
 * STYLES
 ************************************************/

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