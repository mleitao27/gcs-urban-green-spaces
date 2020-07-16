import React, { useState, useEffect } from 'react';
import { IoIosRemoveCircle, IoIosAddCircle, IoMdCreate, IoIosSend } from "react-icons/io";
import strings from './strings';

const AnswerItem = props => {

    if (props.item.done === true) {

        let location = props.item.data.find(d => d.id === strings.BASE_SENSORS_GEOLOCATION);
        if (typeof location === 'undefined') location = '';

        let weather = props.item.data.find(d => d.id === strings.BASE_SENSORS_WEATHER);
        if (typeof weather === 'undefined') weather = '';

        let ugs = props.item.data.find(d => d.id === strings.BASE_UGS_LIST);
        if (typeof ugs === 'undefined') ugs = '';

        let opinion = props.item.data.find(d => d.id === strings.BASE_ABOUT_UGS);
        if (typeof opinion === 'undefined') opinion = '';

        let animal = props.item.data.find(d =>d.id === strings.BASE_ANIMAL);
        if (typeof animal === 'undefined') animal = '';

        let animalOther = props.item.data.find(d =>d.id === strings.BASE_ANIMAL_OTHER);
        if (typeof animalOther === 'undefined') animalOther = '';

        let vegetation = props.item.data.find(d =>d.id === strings.BASE_VEGETATION);
        if (typeof vegetation === 'undefined') vegetation = '';

        let vegetationOther = props.item.data.find(d =>d.id === strings.BASE_VEGETATION_OTHER);
        if (typeof vegetationOther === 'undefined') vegetationOther = '';

        let manmade = props.item.data.find(d =>d.id === strings.BASE_MANMADE);
        if (typeof manmade === 'undefined') manmade = '';

        let manmadeOther = props.item.data.find(d =>d.id === strings.BASE_MANMADE_OTHER);
        if (typeof manmadeOther === 'undefined') manmadeOther = '';

        let motivation = props.item.data.find(d =>d.id === strings.BASE_MOTIVATION);
        if (typeof motivation === 'undefined') motivation = '';

        let motivationOther = props.item.data.find(d =>d.id === strings.BASE_MOTIVATION_OTHER);
        if (typeof motivationOther === 'undefined') motivationOther = '';

        let feeling = props.item.data.find(d =>d.id === strings.BASE_FEELING);
        if (typeof feeling === 'undefined') feeling = '';

        return (
            <React.Fragment>
                <div style={styles.itemContainer}>
                    <div style={styles.textContainer}>
                        <p> Username: {props.item.user} </p>
                        <p> Date: {props.item.timestamp} </p>
                        <p> Address: {location.value.data.street}, {location.value.data.city}, {location.value.data.country} </p>
                        <p> Latitude: {location.value.data.latitude}, Longitude: {location.value.data.longitude} </p>
                        <p> Weather: {Math.round(weather.value.data.temp-273)}ºC ({weather.value.data.description}) </p>
                        <p> UGS name: {ugs.value} </p>
                        <p> About UGS: {opinion.value} </p>
                        <p> Animal elements: {animal.value.map((a, i) => {return <React.Fragment>{a}{i===animal.value.length-1 ? '' : ','} </React.Fragment>})} </p>
                        <p> Other animal elements: {animalOther.value} </p>
                        <p> Vegetation elements: {vegetation.value.map((v, i) => {return <React.Fragment>{v}{i===vegetation.value.length-1 ? '' : ','} </React.Fragment>})} </p>
                        <p> Other vegetation elements: {vegetationOther.value} </p>
                        <p> Man made elements: {manmade.value.map((mm, i) => {return <React.Fragment>{mm}{i===manmade.value.length-1 ? '' : ','} </React.Fragment>})} </p>
                        <p> Other man made elements: {manmadeOther.value} </p>
                        <p> Motivation: {motivation.value.map((m, i) => {return <React.Fragment>{m}{i===motivation.value.length-1 ? '' : ','} </React.Fragment>})} </p>
                        <p> Other motivation: {motivationOther.value} </p>
                        <p> Feeling: {feeling.value} </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <IoIosRemoveCircle style={{color: '#cc0000', fontSize: 36}} onClick={props.props.removeAnswer.bind(this, props.item._id)} />
                    </div>
                </div>
            </React.Fragment>
        );
    
    } else return <React.Fragment/>;
};

// Styling
const styles = {
    itemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderBottom: '1px #ccc dotted',
        fontSize: 16
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        width: '100%'
    },
    cropImage: {
        width: window.innerWidth*0.1,
        height: window.innerWidth*0.1,
        overflow: 'hidden'
    }
};

export default AnswerItem;