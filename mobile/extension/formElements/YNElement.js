import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Colors from '../../constants/colors';
import CustomButton from '../../components/CustomButton';

import IconAD from 'react-native-vector-icons/AntDesign';

const YNElement = props => {
    
    const answer = (enteredValue) => {
        props.onChange(props.pageIndex, props.index, enteredValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.props.name}</Text>
            <View style={styles.btnContainer}>
                <CustomButton
                    title={<IconAD name={'like2'} size={Dimensions.get('window').width*0.1} color={Colors.primary}/>}
                    onPress={answer.bind(this, true)}
                    backgroundColor={'#0F9D58'}
                    textColor={Colors.secondary}
                />
                <CustomButton
                    title={<IconAD name={'dislike2'} size={Dimensions.get('window').width*0.1} color={Colors.primary}/>}
                    onPress={answer.bind(this, false)}
                    backgroundColor={'#DB4437'}
                    textColor={Colors.secondary}
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