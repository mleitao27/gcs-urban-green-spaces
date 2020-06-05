import SensorElement from './SensorElement';
import YNElement from './YNElement';
import InfoElement from './InfoElement';
import FeelElement from './FeelElement';
import ZipElement from './ZipElement';

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
    }
];

export default ext;