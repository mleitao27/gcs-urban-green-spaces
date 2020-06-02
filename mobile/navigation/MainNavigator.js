import { createStackNavigator, TransitionSpecs } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import SurveyScreen from '../screens/SurveyScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

import Colors from '../constants/colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerBackTitle: 'Back'
};

const MainNavigator = createStackNavigator({
    Main: {
        screen: MainScreen
    },
    Survey: {
        screen: SurveyScreen
    },
    Results: {
        screen: ResultsScreen
    },
    Register: {
        screen: RegisterScreen
    },
    Profile: {
        screen: ProfileScreen
    }
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

export default createAppContainer(MainNavigator);