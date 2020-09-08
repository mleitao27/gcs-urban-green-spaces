import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Colors from '../../constants/colors';
import CustomButton from '../../components/CustomButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const YNElement = props => {
    
    const answer = (enteredValue) => {
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.props.name}</Text>
            <View style={styles.btnContainer}>
                <CustomButton
                    title={<MaterialCommunityIcons name={'heart-outline'} size={Dimensions.get('window').width*0.1} color={Colors.primary}/>}
                    onPress={answer.bind(this, true)}
                    backgroundColor={'#81BD8F'}
                    textColor={Colors.secondary}
                    borderRadius={(windowHeight + windowWidth)}
                    width={windowWidth*0.4}
                    height={windowHeight*0.05}
                />
                <CustomButton
                    title={<MaterialCommunityIcons name={'heart-broken-outline'} size={Dimensions.get('window').width*0.1} color={Colors.primary}/>}
                    onPress={answer.bind(this, false)}
                    backgroundColor={'#E84857'}
                    textColor={Colors.secondary}
                    borderRadius={(windowHeight + windowWidth)}
                    width={windowWidth*0.4}
                    height={windowHeight*0.05}
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
        marginBottom: Dimensions.get('window').height * 0.02,
        fontWeight: 'bold'
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: Dimensions.get('window').width*0.5
    }
});

export default YNElement;