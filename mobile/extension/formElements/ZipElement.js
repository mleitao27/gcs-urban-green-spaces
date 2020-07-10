import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Dimensions } from 'react-native';

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
            <Text> - </Text>
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
        paddingVertical: Dimensions.get('window').height * 0.045
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02
    },
    zipContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: Dimensions.get('window').height * 0.01,
        paddingHorizontal: Dimensions.get('window').width * 0.02,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    zip1: {
        width: Dimensions.get('window').height * 0.07
    },
    zip2: {
        width: Dimensions.get('window').height * 0.06
    }
});

export default ZipElement;