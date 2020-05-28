import SensorElement from './SensorElement';
import YNElement from './YNElement';
import InfoElement from './InfoElement';

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
    }
];

export default ext;