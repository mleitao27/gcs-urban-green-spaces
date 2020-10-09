import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';

import dictionary from '../dictionaryExtension.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation1 = props => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{...styles.text, ...styles.title}}>
                    Welcome to the Urban Green Spaces (UGS) mapping app.
                </Text>
                <Text style={styles.text}>
                    This app was developed in the context of a master's thesis from Instituto Superior Técnico in collaboration with professors from Faculdade de Ciências da Universidade de Lisboa.
                    The objective of this app is collect data regarding the UGS usage and their users preferences.
                    Every piece of collected information will be used with scientific purposes only, allowing researcher to study and find ways to improve UGS.
                    Here you can find a brief tutorial explaining how to use the app.
                </Text>
            </View>
        </ScrollView>
    );
};

/*<Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('http://google.com')}>
  Google
</Text>*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.05
    },
    content: {
        paddingBottom:windowWidth * 0.1
    },
    text: {
        textAlign:'center',
        lineHeight: windowHeight*0.05
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: windowHeight*0.05
    },
});

export default presentation1;