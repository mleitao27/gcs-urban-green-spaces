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
        <ScrollView style={styles.container}>
            {props.data.map(d => {
                return (
                    <MarkerDetailsItem key={`${d.lat}${d.long}`} marker={d}/>
                );
            })}
            <View style={styles.btnContainer}>
                <CustomButton
                    title={dictionary[props.navigation.state.params.language].BACK}
                    onPress={props.onExit}
                    backgroundColor={'white'}
                    textColor={'black'}
                    shadow={true}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: (windowHeight+windowWidth) * 0.1,
    },
    btnContainer: {
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height*0.02
    }
});

export default MarkerDetails;