import React from 'react';
import FormScreenExtension from '../../extension/FormScreenExtension';

const FormScreen = props => {
    return (
        <FormScreenExtension navigation={props.navigation} />
    );
};

export default FormScreen;