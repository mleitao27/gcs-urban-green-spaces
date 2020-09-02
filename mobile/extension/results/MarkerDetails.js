import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import CustomButton from '../../components/CustomButton';
import MarkerDetailsItem from './MarkerDetailsItem';

import dictionary from '../dictionaryExtension.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MarkerDetails = props => {
    return (
        <View style={{height: '100%'}}>
            <ScrollView style={styles.container}>
                {props.data.map(d => {
                    return (
                        <MarkerDetailsItem key={`${d.lat}${d.long}`} marker={d}/>
                    );
                })}
            </ScrollView>
            <View style={styles.btnContainer}>
                <CustomButton
                    title={dictionary[props.navigation.state.params.language].BACK}
                    onPress={props.onExit}
                    backgroundColor={'white'}
                    textColor={'black'}
                    shadow={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: (windowHeight+windowWidth) * 0.1,
    },
    btnContainer: {
        alignItems: 'center',
        marginVertical: Dimensions.get('window').height*0.01,
        position: 'absolute',
        width: '100%',
        bottom: 0
    }
});

export default MarkerDetails;