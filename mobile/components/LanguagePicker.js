/* 
 * LanguagePicker (Component)
 * Description : Button used to select app language
 * Props :
 * - language : value that defines the language currently selected in the app
 * - setLanguage : function to change the app language state
 */

// Imports
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import config from '../extension/config';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/************************************************
 * 
 * COMPONENT
 * 
 ************************************************/
const LanguagePicker = props => {

    /************************************************
     * STATES
     ************************************************/
    // State used to store the selected language value
    const [language, setLanguage] = useState(null);
    
    /************************************************
     * USEEFFECT
     ************************************************/
    // On render get app language
    useEffect(() => {

        // If no language was previously selected
        if (props.language === null) {

            // Check for provided languages in the config file
            if (typeof config.languages !== 'undefined')
                if (typeof config.languages.length !== 'undefined')
                    if (language === null) {
                        // Set language to first provided language
                        setLanguage(config.languages[0]);
                        props.setLanguage(config.languages[0]);
                    }

        } 
        // Set language to previously selected one
        else setLanguage(props.language);
    });

    /************************************************
     * FUNCTIONS
    ************************************************/
    // Chnage language when button pressed
    const changeLanguage = () => {

        // Get index of current language
        const index = config.languages.findIndex(l => l === language);

        // If selected language provided in config
        if (index !== -1) {

            // If last language in array
            if (index === config.languages.length-1) {
                // Return to the beginning
                setLanguage(config.languages[0]);
                props.setLanguage(config.languages[0]);
            } else {
                // Skip to next language
                setLanguage(config.languages[index+1]);
                props.setLanguage(config.languages[index+1]);
            }

        } else {
            // Set language to first provided language
            setLanguage(config.languages[0]);
            props.setLanguage(config.languages[0]);
        }
    };

    // Depending on the selected language
    // Get corresponding image from the assets folder
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

    /************************************************
     * PRE-RENDER
     ************************************************/
    // Button with flag corresponding to the selecte d language
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
    
    /************************************************
     * RENDER
     ************************************************/
    return (
        <View>
            {languageContent}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    image: {
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: (windowHeight + windowWidth)
    }
});

// Export component
export default LanguagePicker;