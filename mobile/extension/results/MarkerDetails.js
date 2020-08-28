import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';

import MarkerDetailsItem from './MarkerDetailsItem';
import BackButton from '../../components/BackButton';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MarkerDetails = props => {
    return (
        <ScrollView>
            <BackButton onPress={props.onExit} />
            <View style={{paddingTop: Dimensions.get('window').height*0.07, paddingHorizontal:(windowHeight + windowWidth) * 0.015, }}>
                {props.data.map(d => {
                    return (
                        <MarkerDetailsItem key={`${d.lat}${d.long}`} marker={d}/>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default MarkerDetails;