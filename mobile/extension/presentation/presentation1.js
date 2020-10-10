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
                    {dictionary[props.language].PRESENTATION.PAGE[1].TITLE}
                </Text>
                <Text style={styles.text}>
                {dictionary[props.language].PRESENTATION.PAGE[1].TEXT[1]}
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