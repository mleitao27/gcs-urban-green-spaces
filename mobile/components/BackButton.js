import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import globalStyles from '../constants/globalStyles';

const BackButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={globalStyles.backButton}>
            <Image style={styles.image} source={require('../assets/back_btn.png')} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default BackButton;