import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ScrollView } from 'react-native';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const presentation2 = props => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={{...styles.text, ...styles.title}}>
                    Profile
                </Text>
                <Text style={styles.text}>
                    In the profile is requested some personal information about you.
                    This data is import because it will help researchers to better interpret your answers.
                    The profile screen can be divided into 2 main parts.
                    The first part regards your basic user information, used only to identify you.
                    Here you have the section mark as 1 where will be displayed your ranking within the app, in the section 2 will be visible your profile information such as profile photo, name, user type (normal or researcher) and you e-mail, finally the button in section 3 will allow you to edit this information.
                </Text>
                <Image
                        style={styles.image1}
                        source={require('../assets/profile1.png')}
                />
                <Text style={styles.text}>
                    After entering the editing mode you will be presented with the following screen.
                    Section 4 and 5 allow you to change your profile photo and name respectively, all these changes will only have effect when the button in section 6 is pressed.
                </Text>
                <Image
                        style={styles.image2}
                        source={require('../assets/profile2.png')}
                />
                <Text style={styles.text}>
                    The second part of the profile screen contains in section 7 information that will be used by the researchers to understand who visits UGS and to provide custom solutions and draw accurate conclusions from each answer given by each user.
                    By clicking the button in section 8 you will be able to help our researcher team by providing your detailed information through the proposed survey.
                </Text>
                <Image
                        style={styles.image3}
                        source={require('../assets/profile3.png')}
                />
                <Text style={styles.text}>
                    After filling the survey do not forget to press the submit button (section 9) in order to save your answer.
                </Text>
                <Image
                        style={styles.image4}
                        source={require('../assets/profile4.png')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: windowWidth * 0.05
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
        height: windowWidth*0.8*1.11,
    },
    image2: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*1.23,
    },
    image3: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*1.61,
    },
    image4: {
        width: windowWidth*0.8,
        height: windowWidth*0.8*0.28,
    }
});

export default presentation2;