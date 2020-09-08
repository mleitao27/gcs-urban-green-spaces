/* 
 * UserList (Component)
 * Description : List that returns every object from a UserItem list
 * Props :
 * - userList: Array of UserItem objects
 * - changeUserType: Function that toggles between user types
 * - removeUser: Function that removes a specific user from the DB 
 */

 //Imports
import React from 'react';

import UserItem from './UserItem';

/************************************************
 * 
 * COMPONENT - List
 * 
 ************************************************/
const UserList = props => {

    /************************************************
     * RENDER
     ************************************************/
    return (
        // Maps user list receive as prop as UserItem to be displayed
        props.userList.map(user => {
        return (
            <UserItem
                key={user.email}
                user={user}
                changeUserType={props.changeUserType}
                removeUser={props.removeUser}
            />
        );
        })
    );
};

export default UserList;