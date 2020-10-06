/* 
 * MenuScreen (Component)
 * Description : Mounted on the main screen and contains the app's menu
 * Props :
 * - navigation : navigation object used to navigate between the app's screens
 * - email : logged user's e-mail
 * - language : language code selected by the user
 */

// Imports
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Colors from '../constants/colors';

import CustomButton from '../components/CustomButton';

import dictionary from '../data/dictionary.json';

import config from '../extension/config';

import dictionaryExtension from '../extension/dictionaryExtension.json';

import globalStyles from '../constants/globalStyles';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var dots = 0;

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const MenuScreen = props => {

    const [infoModalShow, setInfoModalShow] = useState(false);
    const [interval, setInterval] = useState(0);
    const [finalPresentation, setFinalPresentation] = useState(<View/>);

    useEffect(() => {
        let PresentationElement = <View/>;
        setFinalPresentation(
            config.presentation.map((value, index) => {
                PresentationElement = config.presentation[index];
                return <PresentationElement key={index} />;
            })
        );
    }, []);

    /************************************************
     * FUNCTIONS
    ************************************************/

    // Logs user out of the system
    const logout = async () => {
        // Logout from the server
        const res = await fetch(`${config.serverURL}/api/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.email
            })
        });
        // Logs user out of the app by forgetting its e-mail and password
        props.onLogout(false, '', '');
    };

    /************************************************
     * PRE - RENDER
    ************************************************/

    // Check if welcome text is provided
    let welcomeContent = <View />;
    if (typeof dictionaryExtension[props.language].WELCOME !== 'undefined')
        welcomeContent = <Text style={styles.text}>{dictionaryExtension[props.language].WELCOME}</Text>

    /************************************************
     * RENDER
    ************************************************/
    return (
        <SafeAreaView style={globalStyles.androidSafeArea}>
            <TouchableOpacity onPress={() => setInfoModalShow(true)}>
                <Ionicons name="ios-information-circle-outline" size={24} color={Colors.primary} />
                <Modal transparent={true} visible={infoModalShow}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => setInfoModalShow(false)}>
                                    <Ionicons name="ios-close" size={32} color={Colors.primary} />
                                </TouchableOpacity>
                            </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <ScrollView
                                        horizontal={true}
                                        onScroll={data => {
                                            if (data.nativeEvent.contentOffset.x / (windowWidth*0.9) > interval + 0.5)
                                                setInterval(interval + 1);
                                            else if (data.nativeEvent.contentOffset.x / (windowWidth*0.9) < interval -0.5)
                                                setInterval(interval - 1);
                                        }}
                                        contentContainerStyle={{
                                            width: windowWidth*0.9 * 3,
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={20}
                                        decelerationRate="fast"
                                        pagingEnabled={true}>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                {finalPresentation}
                                            </View>
                                    </ScrollView>

                                    <View style={styles.Dotsview}>
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
                    </View>
                </Modal>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/landing_logo.png')} />
                </View>

                <View style={{ ...styles.textContainer, ...styles.welcomeTextContainer }}>
                    {welcomeContent}
                </View>
                <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingBottom: windowHeight * 0.03 }}>
                    <View style={{ height: '75%', justifyContent: 'space-between', width: '100%', alignItems: 'center', }}>
                        <CustomButton
                            title={dictionary[props.language].PROFILE}
                            onPress={() => props.navigation.navigate({ routeName: 'Profile', params: { email: props.email, logout: logout, language: props.language } })}
                            backgroundColor={'white'}
                            shadow={true}
                            textColor={'black'}
                            height={windowHeight * 0.1}
                            width={windowWidth * 0.85}
                            bold={true}
                        />
                        <CustomButton
                            title={dictionary[props.language].SURVEY}
                            onPress={() => props.navigation.navigate({ routeName: 'Survey', params: { email: props.email, logout: logout, language: props.language } })}
                            backgroundColor={'white'}
                            shadow={true}
                            textColor={'black'}
                            height={windowHeight * 0.1}
                            width={windowWidth * 0.85}
                            bold={true}
                        />
                        <CustomButton
                            title={dictionary[props.language].RESULTS}
                            onPress={() => props.navigation.navigate({ routeName: 'Results', params: { email: props.email, logout: logout, language: props.language } })}
                            backgroundColor={'white'}
                            shadow={true}
                            textColor={'black'}
                            height={windowHeight * 0.1}
                            width={windowWidth * 0.85}
                            bold={true}
                        />
                    </View>
                    <CustomButton
                        title={dictionary[props.language].LOGOUT}
                        onPress={logout}
                        backgroundColor={'white'}
                        textColor={'black'}
                        underline={true}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...globalStyles.screen,
        justifyContent: 'flex-start'
    },
    imageContainer: {
        width: (windowHeight + windowWidth) * 0.25,
        height: (windowHeight + windowWidth) * 0.15,
        marginVertical: windowHeight * 0.03
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    welcomeTextContainer: {
        marginBottom: windowHeight * 0.03,
        width: '85%'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: (windowWidth + windowHeight) * 0.012,
        textAlign: 'center'
    },
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
    view: {
        width: windowWidth*0.9,
        alignItems: 'center',
    },
    Dotsview: {
        marginBottom: 150,
        width: windowWidth * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

// Export component
export default MenuScreen;