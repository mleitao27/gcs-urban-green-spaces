import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation3 = props => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{...styles.text, ...styles.title}}>
                    Survey
                </Text>
                <Text style={styles.text}>
                    The survey screen is the most relevant screen in the app.
                    Because it is here where you, the user, will be able to shared with the researchers' team your opinion about the UGS.
                    The answers given in these surveys are the reason for the existence of this app, so it is asked of you to answer as honestly and thoughtfully as possible.
                    This screen is divided into 2 sub screens.
                    The form screen can be accessed by pressing the button in the section 1.
                </Text>
                <Image
                    style={styles.image1}
                    source={require('../assets/survey1.png')}
                />
                <Text style={styles.text}>
                    The form screen consists of a map where the user can see its geographical position as well as the UGS marked in the map with a green circumference as shown in the section 2.
                    In the screen there will also appear different questions in the section 3 to which you must answer in order to complete the survey.
                    There is also a button that allows to change the map's type (section 4).
                </Text>
                <Image
                    style={styles.image2}
                    source={require('../assets/survey2.png')}
                />
                <Text style={styles.text}>
                    By clicking in the button in section 5 you will be redirected to the mapping sub screen.
                    This screen is also dedicated to the collection of data about UGS.
                    But this time the user is asked to mark relevant places inside each UGS.
                    These markers can either be associated with the user's feelings, the weather or the UGS elements.
                </Text>
                <Image
                    style={styles.image3}
                    source={require('../assets/survey3.png')}
                />
                <Text style={styles.text}>
                    The screen contains a map similar to the one presented before but where will be presented the marked places like in section 6.
                    Below (section 7) are the buttons that must be pressed in order to mark a specific place.
                </Text>
                <Image
                    style={styles.image4}
                    source={require('../assets/survey4.png')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.05,
    },  
    content: {
        paddingBottom:windowWidth * 0.1
    },
    text: {
        textAlign:'center',
        lineHeight: windowHeight*0.05
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: windowHeight*0.05
    },
    image1: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*0.26,
    },
    image2: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*1.79,
    },
    image3: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*0.26,
    },
    image4: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*2.09,
    }
});

export default presentation3;