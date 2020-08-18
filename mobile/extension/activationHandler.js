/* 
 * activationHandler (Function)
 * Description : Function called for each activation mode selected by the user
 * in the activation json file
 * Props :
 * - activationMode : name of the activation mode
 */

// Imports
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Notifications } from 'expo';

/************************************************
 * 
 * FUNCTION
 * 
 ************************************************/
const activationHandler = async (activationMode) => {
  
  // When called presents a notification to the app user
  const onEnterArea = () => {
    // Define notification
    const localNotification = {
      title: 'Entered an UGS!',
      body: 'Please answer a survey.'
    };

    // Present mobile local notification
    Notifications.presentLocalNotificationAsync(localNotification);
  };

  // If the activation mode is area
  if (activationMode.mode === 'area') {

    // Define the onEnterArea task with the task manager
    TaskManager.defineTask('onEnterArea', onEnterArea);

    // Get location and notification permissions
    let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
    let notificationsPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // If permissions granted
    if (locationPermission.status === 'granted' && notificationsPermission.status === 'granted') {

      let fences = [];
      
      // Get all areas from json to fences array
      activationMode.areas.map(area => {
        fences.push({
          latitude: parseFloat(area.lat),
          longitude: parseFloat(area.long),
          radius: Math.round(Math.sqrt(parseFloat(area.area)/Math.PI)),
          notifyOnEnter: true,
          notifyOnExit: false
        });
      });
      
      // Creates geofence around every area in array
      // When fence jumped, onEnterArea called
      Location.startGeofencingAsync('onEnterArea', fences);
      
    }
  }
};

// Export function
export default activationHandler;