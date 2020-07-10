import SensorElement from './formElements/SensorElement';
import YNElement from './formElements/YNElement';
import InfoElement from './formElements/InfoElement';
import FeelElement from './formElements/FeelElement';
import ZipElement from './formElements/ZipElement';
import GeoMarkerElement from './formElements/GeoMarkerElement';

const ext = [
    {
        type: 'ext:sensor',
        component: SensorElement
    },
    {
        type: 'ext:yn',
        component: YNElement
    },
    {
        type: 'ext:info',
        component: InfoElement
    },
    {
        type: 'ext:feel',
        component: FeelElement
    },
    {
        type: 'ext:zip',
        component: ZipElement
    },
    {
        type: 'ext:geomarker',
        component: GeoMarkerElement
    }
];

export default ext;