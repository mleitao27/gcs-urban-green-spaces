import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import CustomButton from '../../components/CustomButton';
import MarkerDetailsItem from './MarkerDetailsItem';

const MarkerDetails = props => {
    return (
        <ScrollView>
            {props.data.map(d => {
                return (
                    <MarkerDetailsItem key={`${d.lat}${d.long}`} marker={d}/>
                );
            })}
            <View style={styles.btnContainer}>
                <CustomButton
                    title='Back'
                    onPress={props.onExit}
                    backgroundColor={Colors.primary}
                    textColor={Colors.secondary}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center'
    }
});

export default MarkerDetails;