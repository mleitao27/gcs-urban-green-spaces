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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomButton = props => {

    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return(
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={{...styles.button, backgroundColor: props.backgroundColor}}>
                    <Text style={{...styles.buttonText, color: props.textColor}}>{props.title}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

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

export default CustomButton;