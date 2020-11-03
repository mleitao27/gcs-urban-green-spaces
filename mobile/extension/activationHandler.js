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

import config from './config';

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
      title: `Entered an UGS!`,
      body: 'Please answer a survey.',
      android: {
        icon: `${config.serverURL}/public/icon.png`,
      }
    };

    // Present mobile local notification
    Notifications.presentLocalNotificationAsync(localNotification);
  };

  const calcDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const Q1 = lat1 * Math.PI/180; // φ, λ in radians
    const Q2 = lat2 * Math.PI/180;
    const deltaQ = (lat2-lat1) * Math.PI/180;
    const deltaL = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaQ/2) * Math.sin(deltaQ/2) +  Math.cos(Q1) * Math.cos(Q2) * Math.sin(deltaL/2) * Math.sin(deltaL/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
  };

  const sortByProximity = (fences, location) => {
    fences.sort((a, b) => {
      const distA = calcDistance(parseFloat(location.coords.latitude), parseFloat(location.coords.longitude), parseFloat(a.latitude), parseFloat(a.longitude));
      const distB = calcDistance(parseFloat(location.coords.latitude), parseFloat(location.coords.longitude), parseFloat(b.latitude), parseFloat(b.longitude));
      return distA-distB;
    });

    return fences;
  };

  
  // If the activation mode is area
  if (activationMode.mode === 'area') {
    
    // Define the onEnterArea task with the task manager
    TaskManager.defineTask('onEnterArea', onEnterArea);

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    const max = 100;

    // Get location and notification permissions
    let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
    let notificationsPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // If permissions granted
    if (locationPermission.status === 'granted' && notificationsPermission.status === 'granted') {

      let fences = [];
      
      // Get all areas from json to fences array
      activationMode.areas.map(area => {
        let newFence = {
          latitude: parseFloat(area.lat),
          longitude: parseFloat(area.long),
          radius: Math.round(Math.round(Math.sqrt(parseFloat(area.area)/Math.PI))),
          notifyOnEnter: true,
          notifyOnExit: false,
          identifier: area.name
        };
        if (fences.length < max) {
          fences.push(newFence);
          if (fences.length === max) fences = sortByProximity(fences, location);
        } else {
          let dist100 = calcDistance(parseFloat(location.coords.latitude), parseFloat(location.coords.longitude), parseFloat(fences[max-1].latitude), parseFloat(fences[max-1].longitude));
          let distNew = calcDistance(parseFloat(location.coords.latitude), parseFloat(location.coords.longitude), parseFloat(area.lat), parseFloat(area.long));
          
          if (distNew < dist100) {
            fences.pop();
            fences.push(newFence);
            fences = sortByProximity(fences, location);
          }
        }
      });

      await TaskManager.unregisterAllTasksAsync();

      // Creates geofence around every area in array
      // When fence jumped, onEnterArea called
      Location.startGeofencingAsync('onEnterArea', fences);

      let res = (await TaskManager.getRegisteredTasksAsync());
      
    }
  }
};

// Export function
export default activationHandler;