import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Dimensions } from 'react-native';

import globalStyles from '../../constants/globalStyles';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ZipElement = props => {

    const [zip1, setZip1] = useState('');
    const [zip2, setZip2] = useState('');

    useEffect(() => {
        // Send data through the onChange prop
        props.onChange(props.pageIndex, props.index, '');
    }, []);

    const inputHandler = (zip, enteredValue) => {
        if (enteredValue == parseInt(enteredValue) || enteredValue === '' && !enteredValue.includes(' ')) {
            if (zip === 1) {
                setZip1(enteredValue);
                props.onChange(props.pageIndex, props.index, `${enteredValue}-${zip2}`);
            }
            else if (zip === 2) {
                setZip2(enteredValue);
                props.onChange(props.pageIndex, props.index, `${zip1}-${enteredValue}`);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.props.name}</Text>
            <View style={styles.zipContainer}>
            <TextInput
                style={{...styles.input, ...styles.zip1}}
                multiline={false}      // Allows to wrap content in multiple lines
                onChangeText={inputHandler.bind(this, 1)}
                value={zip1}
                maxLength={4}
                keyboardType={'numeric'}
            />
            <Text style={{fontSize: 32,}}>-</Text>
            <TextInput
                style={{...styles.input, ...styles.zip2}}
                multiline={false}      // Allows to wrap content in multiple lines
                onChangeText={inputHandler.bind(this, 2)}
                value={zip2}
                maxLength={3}
                keyboardType={'numeric'}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: windowHeight * 0.045
    },
    title: {
        fontSize: 18,
        marginBottom: windowHeight * 0.02,
        fontWeight: 'bold'
    },
    zipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: windowHeight * 0.01,
        paddingHorizontal: windowWidth * 0.02,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: (windowHeight+windowWidth) * 0.01,
        ...globalStyles.shadow
    },
    zip1: {
        width: windowHeight * 0.07
    },
    zip2: {
        width: windowHeight * 0.06
    }
});

export default ZipElement;