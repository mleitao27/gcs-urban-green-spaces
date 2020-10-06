import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const presentation1 = props => {
    return <View style={{width:Dimensions.get('window').width*0.9, alignItems: 'center'}}><Text>1</Text></View>;
};

export default presentation1;