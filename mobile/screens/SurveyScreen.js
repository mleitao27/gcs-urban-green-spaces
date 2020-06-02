import React from 'react';
import SurveyScreenExtension from '../extension/SurveyScreenExtension';

const SurveyScreen = props => {
    return (
        <SurveyScreenExtension navigation={props.navigation} />
    );
};

export default SurveyScreen;