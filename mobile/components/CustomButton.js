/* 
 * CustomButton (Component)
 * Description : Button used throughout the application
 * Props :
 * - title : button content
 * - textColor : color of the button's content
 * - backgroundColor : color of the button's background
 * - onPress : function executed when button pressed
 */

// Imports
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, 
    Dimensions
} from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT
 * 
 ************************************************/
const CustomButton = props => {

    /************************************************
     * PRE-RENDER
     ************************************************/
    // By default the button is a TouchableOpacity
    let ButtonComponent = TouchableOpacity;

    // If android and version > = 21 button is TouchableNativeFeedback
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    // If btn title is a string wrap it in a <Text/> if is an obj wrap in <View/>
    // Allows for btn content to be an image or icon
    let buttonContent = <View/>;
    if (typeof props.title === 'string')
        buttonContent = <Text style={{...styles.buttonText, color: props.textColor}}>{props.title}</Text>;
    else if (typeof props.title === 'object')
        buttonContent = <View style={{...styles.buttonText, color: props.textColor}}>{props.title}</View>;

    /************************************************
     * RENDER
     ************************************************/
    return(
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={{...styles.button, backgroundColor: props.backgroundColor}}>
                    {buttonContent}
                </View>
            </ButtonComponent>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    button: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    buttonText: {
        fontSize: windowWidth * 0.05
    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

// Export component
export default CustomButton;