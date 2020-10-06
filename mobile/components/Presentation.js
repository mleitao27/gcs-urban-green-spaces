import React, { useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Text
} from 'react-native';

import Colors from '../constants/colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import config from '../extension/config';
import dictionary from '../data/dictionary.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Presentation = props => {

    const [interval, setInterval] = useState(0);

    let content = (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{dictionary[props.language].NO_PRESENTATION}</Text>
        </View>
    );
    if (typeof config.presentation !== 'undefined')
        content = (
            <View style={{flex:1}}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                        <ScrollView
                            horizontal={true}
                            onScroll={data => {
                                if (data.nativeEvent.contentOffset.x / (windowWidth * 0.9) > interval + 0.5)
                                    setInterval(interval + 1);
                                else if (data.nativeEvent.contentOffset.x / (windowWidth * 0.9) < interval - 0.5)
                                    setInterval(interval - 1);
                            }}
                            contentContainerStyle={{
                                width: windowWidth * 0.9 * config.presentation.length,
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={20}
                            decelerationRate="fast"
                            pagingEnabled={true}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex:1 }}>
                                {
                                    config.presentation.map((value, index) => {
                                        PresentationElement = config.presentation[index];
                                        return <PresentationElement key={index} />;
                                    })
                                }
                            </View>
                        </ScrollView>

                        <View style={styles.dotsContainer}>
                            {config.presentation.map((value, index) => {
                                return (
                                    <View key={index}>
                                        <FontAwesome key={index} name={index == interval ? "circle" : "circle-o"} size={windowWidth * 0.03} color="grey" />
                                    </View>
                                );
                            })}
                        </View>
                    </View>
            </View>
        );

    return (
        <Modal transparent={true} visible={props.infoShow}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={props.close}>
                            <Ionicons name="ios-close" size={32} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    {content}
                </View>
            </View>
        </Modal>
    );

};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        width: windowWidth * 0.9,
        height: windowHeight * 0.9,
        borderRadius: windowWidth * 0.02,
        overflow: 'hidden'
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowWidth * 0.02
    },
    dotsContainer: {
        marginBottom: windowHeight*0.05,
        width: windowWidth * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default Presentation;