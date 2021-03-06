import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Colors from '../../constants/colors';
import CustomButton from '../../components/CustomButton';

const InfoElement = props => {
    
    const answer = (enteredValue) => {
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.props.name}</Text>
            <View style={styles.btnContainer}>
                <CustomButton
                    title='OK'
                    onPress={answer.bind(this, true)}
                    backgroundColor={Colors.secondary}
                    textColor={Colors.primary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Dimensions.get('window').height * 0.05
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

export default InfoElement;