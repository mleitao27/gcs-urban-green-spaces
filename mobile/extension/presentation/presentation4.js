import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation3 = props => {
    return (
        <View style={styles.container}>
            <Text style={{...styles.text, ...styles.title}}>
                Results
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: windowWidth * 0.05,
    },
    text: {
        textAlign:'center',
        lineHeight: windowHeight*0.05
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: windowHeight*0.05
    }
});

export default presentation3;