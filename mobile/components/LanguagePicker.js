import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';

import config from '../extension/config';

const LanguagePicker = props => {

    const [language, setLanguage] = useState(null);
    
    useEffect(() => {
    
        if (props.language === null) {
            if (typeof config.languages !== 'undefined')
                if (typeof config.languages.length !== 'undefined')
                    if (language === null) {
                        setLanguage(config.languages[0]);
                        props.setLanguage(config.languages[0]);
                    }
        } else setLanguage(props.language);
    });

    const changeLanguage = () => {
        const index = config.languages.findIndex(l => l === language);
        if (index !== -1) {
            if (index === config.languages.length-1) {
                setLanguage(config.languages[0]);
                props.setLanguage(config.languages[0]);
            } else {
                setLanguage(config.languages[index+1]);
                props.setLanguage(config.languages[index+1]);
            }
        } else {
            setLanguage(config.languages[0]);
            props.setLanguage(config.languages[0]);
        }
    };

    const getImage = () => {
        if (language === 'en')
            return require('../assets/en.png');
        else if (language === 'pt')
            return require('../assets/pt.png'); 
        else if (language === 'ru')
            return require('../assets/ru.png');
        else if (language === 'es')
            return require('../assets/es.png');
        else if (language === 'it')
            return require('../assets/it.png');
        else if (language === 'fr')
            return require('../assets/fr.png');
        else if (language === 'de')
            return require('../assets/de.png'); 
    };

    let languageContent = <View/>;
    if (language !== null)
        languageContent = (    
            <TouchableOpacity onPress={changeLanguage}>
                <Image
                style={styles.image}
                source={getImage()}
            />
            </TouchableOpacity>
        );
        
    return (
        <View>
            {languageContent}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width*0.15,
        height: Dimensions.get('window').width*0.15,
        borderWidth: 1,
        borderRadius: Dimensions.get('window').height
    }
});

export default LanguagePicker;