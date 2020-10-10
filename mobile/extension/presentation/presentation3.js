import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';

import dictionary from '../dictionaryExtension.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation3 = props => {

    const page = dictionary[props.language].PRESENTATION.PAGE[3];

    const imageWidth = windowWidth * 0.8;

    const getImageHeight = (i) => {
        return windowWidth * 0.8 * (page.IMAGE[i].HEIGHT / page.IMAGE[i].WIDTH);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{...styles.text, ...styles.title}}>
                    {page.TITLE}
                </Text>
                <Text style={styles.text}>
                    {page.TEXT[1]}
                </Text>
                <Image
                    style={{
                        width: imageWidth,
                        height:  getImageHeight(1)
                    }}
                    source={require('../assets/survey1.png')}
                />
                <Text style={styles.text}>
                    {page.TEXT[2]}
                </Text>
                <Image
                    style={{
                        width: imageWidth,
                        height:  getImageHeight(2)
                    }}
                    source={require('../assets/survey2.png')}
                />
                <Text style={styles.text}>
                    {page.TEXT[3]}
                </Text>
                <Image
                    style={{
                        width: imageWidth,
                        height:  getImageHeight(3)
                    }}
                    source={require('../assets/survey3.png')}
                />
                <Text style={styles.text}>
                    {page.TEXT[4]}
                </Text>
                <Image
                    style={{
                        width: imageWidth,
                        height:  getImageHeight(4)
                    }}
                    source={require('../assets/survey4.png')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.05,
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

export default presentation3;