/* 
 * MainNavigator (Object)
 * Description : Navigator used to navigate between the
 * different app screens
 */

// Imports
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import SurveyScreen from '../screens/SurveyScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

import Colors from '../constants/colors';

// Object used to define the stack navigation options
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: 'white'
    },
    headerTitleAlign: 'center',
    headerTintColor: 'black',
    headerBackTitle: 'Back',
    cardStyle: { backgroundColor: 'white' }
};

/************************************************
 * 
 * OBJECT - Navigator
 * 
 ************************************************/
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

// Export navigator
export default createAppContainer(MainNavigator);