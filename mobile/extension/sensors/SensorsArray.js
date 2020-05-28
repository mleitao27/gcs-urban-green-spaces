import Accelerometer from './Accelerometer';
import Barometer from './Barometer';
import GeolocationSensor from './GeolocationSensor';
import Gyroscope from './Gyroscope';
import Magnetometer from './Magnetometer';
import Pedometer from './Pedometer';
import WeatherSensor from './WeatherSensor';
import GoogleFitSensor from './GoogleFitSensor';

const sensors = {
    accelerometer: Accelerometer,
    barometer: Barometer,
    geolocation: GeolocationSensor,
    gyroscope: Gyroscope,
    magnetometer: Magnetometer,
    pedometer: Pedometer,
    weather: WeatherSensor,
    googlefit: GoogleFitSensor
};

export default sensors;