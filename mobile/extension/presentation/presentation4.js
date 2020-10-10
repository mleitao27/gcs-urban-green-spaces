import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation3 = props => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{...styles.text, ...styles.title}}>
                    Results
                </Text>
                <Text style={styles.text}>
                    The results screen is where the user can find both the given answers and the placed markers.
                    It is structured similarly to the survey screen.
                    By pressing the button in the section 1 the user is taken to the answers list.
                </Text>
                <Image
                    style={styles.image1}
                    source={require('../assets/results1.png')}
                />
                <Text style={styles.text}>
                    Here (section 2) is presented a list of clickable cards containing some information about the different answer given so far.
                </Text>
                <Image
                    style={styles.image2}
                    source={require('../assets/results2.png')}
                />
                <Text style={styles.text}>
                    After clicking in any of the available cards it is displayed some more detailed information about that card's respective answer as it is shown in the section 3.
                    The button in the section 4 will allow you to go back to the answers list.
                </Text>
                <Image
                    style={styles.image3}
                    source={require('../assets/results3.png')}
                />
                <Text style={styles.text}>
                    The button in the section 5 redirects to a list of UGS.
                    This list contains all the UGS where the user placed any marker.
                </Text>
                <Image
                    style={styles.image4}
                    source={require('../assets/results4.png')}
                />
                <Text style={styles.text}>
                    Each UGS will be represented by a clickable card as before and demonstrated in the section 6.
                </Text>
                <Image
                    style={styles.image5}
                    source={require('../assets/results5.png')}
                />
                <Text style={styles.text}>
                    Clicking in one of the mentioned UGS cards will lead to a screen containing a list of all the markers placed in that UGS.
                    In this screen it is also possible to see some details about each individual marker.
                    Equivalently to the answers detail screen here there is also a back button to return to the UGS list.
                </Text>
                <Image
                    style={styles.image6}
                    source={require('../assets/results6.png')}
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
        height: windowWidth*0.8*0.27,
    },
    image2: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*1.81,
    },
    image3: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*2.05,
    },
    image4: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*0.26,
    },
    image5: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*0.67,
    },
    image6: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*2.09,
    },
});

export default presentation3;