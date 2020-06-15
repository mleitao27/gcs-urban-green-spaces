import React from 'react';

import UserItem from './UserItem';

const UserList = props => {

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