import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/colors';

const FeelElement = props => {

    const select = (enteredValue) => {
        props.onChange(props.pageIndex, props.index, enteredValue);
    }

    return (
        <View>
            <Text style={styles.title}>{props.props.name}</Text>
            <View style={styles.facesContainer}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.laughContainer} onPress={select.bind(this, 5)}>
                        <IconFA5 name={'laugh'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.smileContainer} onPress={select.bind(this, 4)}>
                        <IconFA5 name={'smile'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.mehContainer} onPress={select.bind(this, 3)}>
                        <IconFA5 name={'meh'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.sadContainer} onPress={select.bind(this, 2)}>
                        <IconFA5 name={'sad-tear'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.angryContainer} onPress={select.bind(this, 1)}>
                        <IconFA5 name={'angry'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height * 0.02
    },
    facesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconContainer: {
        borderRadius: Dimensions.get('window').height,
        overflow: 'hidden'
    },
    laughContainer: {
        backgroundColor: '#55d006'
    },
    smileContainer: {
        backgroundColor: '#95db07'
    },
    mehContainer: {
        backgroundColor: '#fbd72b'
    },
    sadContainer: {
        backgroundColor: '#ec851c'
    },
    angryContainer: {
        backgroundColor: '#e50b0a'
    }
});

export default FeelElement;