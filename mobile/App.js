/* 
 * App (Main)
 * Description : Main application file
 */

 // Imports
import React from 'react';

import MainNavigator from './navigation/MainNavigator';
import { enableScreens } from 'react-native-screens';
import activationConfig from './config/activationConfig';

// Under the hood react-navigation uses native optimized components
enableScreens();

// Run activation of notifications
activationConfig();

// Export main App component
export default function App() {
  // Return the stack navigator
  return <MainNavigator />;
}