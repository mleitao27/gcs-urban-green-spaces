import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import CustomImage from './CustomImage';
import CustomButton from '../components/CustomButton';

import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import config from './config';

const ResultsDetails = props => {

    const animal = props.data.find(d => d.name === 'What animal elements can be found in this UGS?' && d.type === 'imagepicker').value;
    let otherAnimal = animal.find(a => a === 'other');
    const vegetation = props.data.find(d => d.name === 'What vegetation elements can be found in this UGS?' && d.type === 'imagepicker').value;
    let otherVegetation = vegetation.find(v => v === 'other');
    const manmade = props.data.find(d => d.name === 'What man made elements can be found in this UGS?' && d.type === 'imagepicker').value;
    let otherManmade = manmade.find(m => m === 'other');
    const motivation = props.data.find(d => d.name === 'What was your motivation to come here?' && d.type === 'imagepicker').value;
    let otherMotivation = motivation.find(m => m === 'other');

    let otherAnimalContent = <View/>;
    if (typeof otherAnimal !== 'undefined') {
        otherAnimal = props.data.find(d => d.name === 'What animal elements can be found in this UGS?' && d.type === 'text').value;
        otherAnimalContent = (
            <View>
                <Text style={styles.title}>Other animal elements:</Text>
                <Text style={styles.text}>{otherAnimal}</Text>
            </View>
        );
    }
    
    let otherVegetationContent = <View />;
    if (typeof otherVegetation !== 'undefined') {
        otherVegetation = props.data.find(d => d.name === 'What vegetation elements can be found in this UGS?' && d.type === 'text').value;
        otherVegetationContent = (
            <View>
                <Text style={styles.title}>Other vegetation elements:</Text>
                <Text style={styles.text}>{otherVegetation}</Text>
            </View>
        );
    }

    let otherManmadeContent = <View />;
    if (typeof otherManmade !== 'undefined') {
        otherManmade = props.data.find(d => d.name === 'What man made elements can be found in this UGS?' && d.type === 'text').value;
        otherManmadeContent = (
            <View>
                <Text style={styles.title}>Other man made elements:</Text>
                <Text style={styles.text}>{otherManmade}</Text>
            </View>
        );
    }

    let otherMotivationContent = <View />;
    if (typeof otherMotivation !== 'undefined') {
        otherMotivation = props.data.find(d => d.name === 'What was your motivation to come here?' && d.type === 'text').value;
        otherMotivationContent = (
            <View>
                <Text style={styles.title}>Other motivation:</Text>
                <Text style={styles.text}>{otherMotivation}</Text>
            </View>
        );
    }

    const aboutUGS = props.data.find(d => d.name === 'About this UGS...').value;
    let aboutUGSContent = <View />;
    if (aboutUGS !== '')
        aboutUGSContent = (
            <Text style={styles.text}>{props.data.find(d => d.name === 'About this UGS...').value}</Text>
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

        return feelings[value-1];
    };
    const feeling = props.data.find(d => d.name === 'How are you feeling here?').value;
    let feelingContent = getFeelingIcon(feeling);

    return (
            <ScrollView style={styles.container}>
            <View style={styles.marginBottom}>
                <Text style={styles.title}>Your opinion about the UGS:</Text>
                {aboutUGSContent}
            </View>

            <View style={styles.marginBottom}>
                <Text style={styles.title}>Animal elements:</Text>
                <View style={styles.imageContainer}>
                    {animal.filter(value => value !== 'other').map(d => {
                        return <CustomImage key={d} imageLink={d} style={styles.image}/>;
                    })}
                </View>
                {otherAnimalContent}
            </View>

            <View style={styles.marginBottom}>
                <Text style={styles.title}>Vegetation elements:</Text>
                <View style={styles.imageContainer}>
                    {vegetation.filter(value => value !== 'other').map(d => {
                        return <CustomImage key={d} imageLink={d} style={styles.image}/>;
                    })}
                </View>
                {otherVegetationContent}
            </View>

            <View style={styles.marginBottom}>
                <Text style={styles.title}>Man made elements:</Text>
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
                <Text style={styles.title}>How you felt:</Text>
                {feelingContent}
            </View>
           
           <View style={styles.btnContainer}>
                <CustomButton
                    title='Back'
                    onPress={props.onExit}
                    backgroundColor={Colors.primary}
                    textColor={Colors.secondary}
                />
           </View>
           </ScrollView>
    );
};

const styles= StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: Dimensions.get('window').width*0.02
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
        marginBottom: Dimensions.get('window').height*0.01
    },
    text: {
        fontSize: 16
    },
    btnContainer: {
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height*0.02
    },
    marginBottom: {
        marginBottom: Dimensions.get('window').height*0.02
    }
});

export default ResultsDetails;