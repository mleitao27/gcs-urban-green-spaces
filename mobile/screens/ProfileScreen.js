/* 
 * ProfileScreen (Component)
 * Description : Holds the profile screen the content of this component
 * is loaded from the extension and it's rendered from the Profile option in the menu
 * Props :
 * - navigation : navigation object used to navigate between the app's screens
 */

// Imports
import React from 'react';
import dictionary from '../data/dictionary.json';
import ProfileScreenExtension from '../extension/ProfileScreenExtension';

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const ProfileScreen = props => {
    /************************************************
     * RENDER
    ************************************************/
    // Renders the profile screen component from the extension
    return (
        <ProfileScreenExtension navigation={props.navigation} />
    );
};

// Change in navigation options
// To change the screen's header title
ProfileScreen.navigationOptions = (navData) => {
    return (
        {
            headerTitle: dictionary[navData.navigation.state.params.language].PROFILE
        }
    );
};

// Exports screen
export default ProfileScreen;