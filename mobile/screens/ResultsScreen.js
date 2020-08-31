/* 
 * ResultsScreen (Component)
 * Description : Holds the results screen the content of this component
 * is loaded from the extension and it's rendered from the Results option in the menu
 * Props :
 * - navigation : navigation object used to navigate between the app's screens
 */

// Imports
import React from 'react';
import dictionary from '../data/dictionary.json';
import ResultsScreenExtension from '../extension/ResultsScreenExtension';
import { SafeAreaView, Dimensions, View, StyleSheet } from 'react-native';
import globalStyles from '../constants/globalStyles';
import BackButton from '../components/BackButton.js';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const ResultsScreen = props => {
    /************************************************
     * RENDER
    ************************************************/
    // Renders the results screen component from the extension
   /*return (
        <SafeAreaView style={globalStyles.androidSafeArea}>
            <View style={styles.container}>
                <BackButton onPress={() => props.navigation.pop()}/>
                <ResultsScreenExtension navigation={props.navigation} />
            </View>
        </SafeAreaView>
    );*/

    return (
        <ResultsScreenExtension navigation={props.navigation} />
    );
};

const styles = StyleSheet.create({
    container: {
        ...globalStyles.screen,
        justifyContent: 'flex-start'
    },
});

// Change in navigation options
// To change the screen's header title
ResultsScreen.navigationOptions = (navData) => {
    return (
        {
            headerTitle: dictionary[navData.navigation.state.params.language].RESULTS,
        }
    );
};

// Export screen
export default ResultsScreen;