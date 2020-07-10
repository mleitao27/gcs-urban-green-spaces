import React from 'react';
import { Image, Dimensions } from 'react-native';
import config from '../config';

const CustomImage = props => {
    
    let format = 'png';
    if (typeof props.imageFormat !== 'undefined')
        format = props.imageFormat;

    return (
        <Image
            source={{uri: `${config.serverURL}/public/${props.imageLink}.${format}`}}
            style={props.style}
        />
    );
};

export default CustomImage;