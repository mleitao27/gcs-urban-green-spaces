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
        alignItems: 'center'
    },
    formContainer: {
        marginVertical: windowHeight * 0.05,
        paddingVertical: windowHeight * 0.05,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth * 0.7,
        height: windowHeight * 0.6,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: "center"
    },
    formElement: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: Colors.secondary,
        width: windowWidth * 0.55,
        height: windowHeight * 0.06,
        padding: 10,
        color: 'white'
    },
    title: {
        color: Colors.primary,
        fontSize: windowWidth * 0.1
    }
});

// Export Object
export default globalStyles;