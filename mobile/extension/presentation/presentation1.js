import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Linking } from 'react-native';

import dictionary from '../dictionaryExtension.json';

import CustomButton from '../../components/CustomButton';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation1 = props => {

    const openURL = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{...styles.text, ...styles.title}}>
                    {dictionary[props.language].PRESENTATION.PAGE[1].TITLE}
                </Text>
                <Text style={styles.text}>
                {dictionary[props.language].PRESENTATION.PAGE[1].TEXT[1]}
                </Text>
                <View style={{width: '100%', alignItems: 'center', marginTop: windowHeight*0.03}}>
                    <CustomButton
                        title={dictionary[props.language].USABILITY_FORM}
                        onPress={openURL.bind(this, 'https://forms.gle/rsAb5EpBmygTf2TD8')}
                        backgroundColor={'white'}
                        shadow={true}
                        textColor={'black'}
                        height={windowHeight * 0.06}
                        width={windowWidth * 0.7}
                        bold={true}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

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