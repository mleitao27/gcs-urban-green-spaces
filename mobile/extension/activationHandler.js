import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Notifications } from 'expo';
  
const activationHandler = async (activationMode) => {
  
  const onEnterArea = () => {
    const localNotification = {
      title: 'Entered an UGS!',
      body: 'Please answer a survey.'
    };

    Notifications.presentLocalNotificationAsync(localNotification);
  };

  if (activationMode.mode === 'area') {

    TaskManager.defineTask('onEnterArea', onEnterArea);

    let locationPermission = await Permissions.askAsync(Permissions.LOCATION);
    let notificationsPermission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (locationPermission.status === 'granted' && notificationsPermission.status === 'granted') {

      let fences = [];
      
      activationMode.areas.map(area => {
        fences.push({
          latitude: parseFloat(area.lat),
          longitude: parseFloat(area.long),
          radius: Math.round(Math.sqrt(parseFloat(area.area)/Math.PI)),
          notifyOnEnter: true,
          notifyOnExit: false
        });
      });
      
      Location.startGeofencingAsync('onEnterArea', fences);
      
    }
  }
};

export default activationHandler;