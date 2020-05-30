import React from 'react';

import ResultsScreenExtension from '../../extension/ResultsScreenExtension';

const ResultsScreen = props => {
    return (
        <ResultsScreenExtension navigation={props.navigation} />
    );
};

export default ResultsScreen;