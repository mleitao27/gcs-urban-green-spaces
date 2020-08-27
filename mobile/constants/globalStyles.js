/* 
 * globalStyles (Object)
 * Description : Object containing some styles used repeatedly
 * throughout the application
 */

 // Imports
import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * OBJECT
 * 
 ************************************************/
const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    formElement: {
        padding: 10,
        color: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        width: windowWidth * 0.85,
        height: windowHeight * 0.06,
        backgroundColor: 'white',
    },
    title: {
        color: Colors.primary,
        fontSize: windowWidth * 0.1
    },
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? windowHeight*0.05 : 0
    },
    shadow: { 
        shadowColor: '#E5E5E5',
        shadowOffset: {
            width: -5,
            height: 10,
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        elevation: 3,
    },
    backButton: {
        width: (windowHeight + windowWidth) * 0.02,
        height: (windowHeight + windowWidth) * 0.02,
        position: 'absolute', 
        left: (windowHeight + windowWidth) * 0.015, 
        top: (windowHeight + windowWidth) * 0.01
    }
});

// Export Object
export default globalStyles;