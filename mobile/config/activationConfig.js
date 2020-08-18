import ActivationJSON from '../extension/activationJSON.json';
import activationHandler from '../extension/activationHandler';

const activationConfig = props => {

    // Activation JSON 
    ActivationJSON.ActivationModes.map((activationMode, index) => {
        activationHandler(activationMode);
    });
};

export default activationConfig;