import React from 'react';
import ProfileScreenExtension from '../extension/ProfileScreenExtension';

const ProfileScreen = props => {
    return (
        <ProfileScreenExtension navigation={props.navigation} />
    );
};

export default ProfileScreen;