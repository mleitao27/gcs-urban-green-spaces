import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import config from './config';
import ranking from './ranking.json';

import dictionary from './dictionaryExtension.json';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RankingHandler = props => {

    const [rankingName, setRankingName] = useState('');
    const [rankingId, setRankingId] = useState('');

    useEffect(() => {
        ranking.ranks.map((rank) => {
            if (props.ranking >= rank.min && props.ranking <= rank.max) {
                setRankingName(rank.name);
                setRankingId(rank.id);
            }
        });
    });

    return (
        <ImageBackground
            style={styles.image}
            source={{ uri: `${config.serverURL}/public/`+ rankingId + '.png' }}
        >
            <View style={styles.content}>
                <View style={styles.textRow}>
                    <View style={styles.textColumn}>
                        <Text style={styles.rankingText}>{rankingName}</Text> 
                        <Text style={styles.pointsText}>{dictionary[props.language].POINTS} : {props.ranking} </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        alignSelf:'baseline',
        width: '100%',
        alignItems: 'center',
        height: windowHeight*0.2
    },
    rankingText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: (windowWidth + windowHeight)*0.012
    },
    pointsText: {
        color: Colors.primary,
        fontSize: (windowWidth + windowHeight)*0.012
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    textColumn: {
        alignItems: 'flex-end',
    },
    content: {
        margin: (windowWidth + windowHeight) * 0.01,
    },
});

export default RankingHandler;