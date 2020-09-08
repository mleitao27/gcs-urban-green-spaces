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
import GenercicProfile from '../components/GenericProfile';
import { ScrollView } from 'react-native';

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
        <ScrollView centerContent={true}>
            <GenercicProfile navigation={props.navigation}/>
            <ProfileScreenExtension navigation={props.navigation} />
        </ScrollView>
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