import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import CustomImage from '../components/CustomImage';
import CustomButton from '../../components/CustomButton';

import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import config from '../config';

import strings from '../strings.json';
import dictionary from '../dictionaryExtension.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResultsDetails = props => {

    const animal = props.data.find(d => d.id === strings.BASE_ANIMAL).value;
    let otherAnimal = animal.find(a => a === 'other');
    const vegetation = props.data.find(d => d.id === strings.BASE_VEGETATION).value;
    let otherVegetation = vegetation.find(v => v === 'other');
    const manmade = props.data.find(d => d.id === strings.BASE_MANMADE).value;
    let otherManmade = manmade.find(m => m === 'other');
    const motivation = props.data.find(d => d.id === strings.BASE_MOTIVATION).value;
    let otherMotivation = motivation.find(m => m === 'other');

    let otherAnimalContent = <View/>;
    if (typeof otherAnimal !== 'undefined') {
        otherAnimal = props.data.find(d => d.id === strings.BASE_ANIMAL_OTHER);
        otherAnimalContent = (
            <View>
                <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_ANIMAL_OTHER}:</Text>
                <Text style={styles.text}>{typeof otherAnimal !== 'undefined' ? otherAnimal.value : ''}</Text>
            </View>
        );
    }
    
    let otherVegetationContent = <View />;
    if (typeof otherVegetation !== 'undefined') {
        otherVegetation = props.data.find(d => d.id === strings.BASE_VEGETATION_OTHER);
        otherVegetationContent = (
            <View>
                <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_VEGETATION_OTHER}:</Text>
                <Text style={styles.text}>{typeof otherVegetation !== 'undefined' ? otherVegetation.value : ''}</Text>
            </View>
        );
    }

    let otherManmadeContent = <View />;
    if (typeof otherManmade !== 'undefined') {
        otherManmade = props.data.find(d => d.id === strings.BASE_MANMADE_OTHER);
        otherManmadeContent = (
            <View>
                <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_MANMADE_OTHER}:</Text>
                <Text style={styles.text}>{typeof otherManmade !== 'undefined' ? otherManmade.value : ''}</Text>
            </View>
        );
    }

    let otherMotivationContent = <View />;
    if (typeof otherMotivation !== 'undefined') {
        otherMotivation = props.data.find(d => d.id === strings.BASE_MOTIVATION_OTHER);
        otherMotivationContent = (
            <View>
                <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_MOTIVATION_OTHER}:</Text>
                <Text style={styles.text}>{typeof otherMotivation !== 'undefined' ? otherMotivation.value : ''}</Text>
            </View>
        );
    }

    const aboutUGS = props.data.find(d => d.id === strings.BASE_ABOUT_UGS);
    let aboutUGSContent = <View />;
    if (aboutUGS !== '')
        aboutUGSContent = (
            <Text style={styles.text}>{typeof aboutUGS !== 'undefined' ? aboutUGS.value : ''}</Text>
        );
    
    const getFeelingIcon = value => {

        const feelings = [
            (<View style={{...styles.iconContainer, ...styles.angryContainer}}>
                    <IconFA5 name={'angry'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
            </View>),
            (<View style={{...styles.iconContainer, ...styles.sadContainer}}>
                    <IconFA5 name={'sad-tear'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
            </View>),
            (<View style={{...styles.iconContainer, ...styles.mehContainer}}>
                    <IconFA5 name={'meh'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
            </View>),
            (<View style={{...styles.iconContainer, ...styles.smileContainer}}>
                <IconFA5 name={'smile'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
            </View>),
            (<TouchableOpacity style={{...styles.iconContainer, ...styles.laughContainer}}>
                <IconFA5 name={'laugh'} size={Dimensions.get('window').width*0.15} color={Colors.primary} />
            </TouchableOpacity>),
        ];

        return typeof value !== 'undefined' ? feelings[value-1] : (<View/>);
    };
    const feeling = props.data.find(d => d.id === strings.BASE_FEELING).value;
    let feelingContent = getFeelingIcon(feeling);

    return (
        <View style={{height: '100%'}}>
            <ScrollView style={styles.container}>
                <View style={{...styles.marginBottom, ...styles.marginTop}}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_ABOUT_UGS}:</Text>
                    {aboutUGSContent}
                </View>

                <View style={styles.marginBottom}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_ANIMAL}:</Text>
                    <View style={styles.imageContainer}>
                        {animal.filter(value => value !== 'other').map(d => {
                            return <CustomImage key={d} imageLink={d} style={styles.image}/>;
                        })}
                    </View>
                    {otherAnimalContent}
                </View>

                <View style={styles.marginBottom}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_VEGETATION}:</Text>
                    <View style={styles.imageContainer}>
                        {vegetation.filter(value => value !== 'other').map(d => {
                            return <CustomImage key={d} imageLink={d} style={styles.image}/>;
                        })}
                    </View>
                    {otherVegetationContent}
                </View>

                <View style={styles.marginBottom}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_MANMADE}:</Text>
                    <View style={styles.imageContainer}>
                        {manmade.filter(value => value !== 'other').map(d => {
                            return <CustomImage key={d} imageLink={d} style={styles.image}/>;
                        })}
                    </View>
                    {otherManmadeContent}
                </View>
                
                <View style={styles.marginBottom}>
                    {otherMotivationContent}
                </View>

                <View style={styles.marginBottom}>
                    <Text style={styles.title}>{dictionary[props.navigation.state.params.language].RESULTS_FEELING}:</Text>
                    {feelingContent}
                </View>
            
            </ScrollView>
            <View style={styles.btnContainer}>
                    <CustomButton
                        title={dictionary[props.navigation.state.params.language].BACK}
                        onPress={props.onExit}
                        backgroundColor={'white'}
                        textColor={'black'}
                        shadow={true}
                    />
                </View>
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: Dimensions.get('window').width*0.03
    },
    image: {
        height: Dimensions.get('window').width*0.15,
        width: Dimensions.get('window').width*0.15,
        marginRight: Dimensions.get('window').width*0.05
    },
    imageContainer: {
        flexDirection: 'row'
    },
    iconContainer: {
        borderRadius: Dimensions.get('window').height,
        overflow: 'hidden',
        width: Dimensions.get('window').width*0.15
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
    },
    title: {
        fontSize: 18,
        marginBottom: Dimensions.get('window').height*0.01,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16
    },
    btnContainer: {
        alignItems: 'center',
        marginVertical: Dimensions.get('window').height*0.01
    },
    marginBottom: {
        marginBottom: Dimensions.get('window').height*0.04
    },
    marginTop: {
        marginTop: Dimensions.get('window').height*0.05
    },
});

export default ResultsDetails;