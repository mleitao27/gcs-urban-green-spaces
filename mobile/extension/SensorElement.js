import React from 'react';
import sensors from './sensors/SensorsArray';

const SensorElement = props => {

    const onChange = (pageIndex, index, data) => {
        console.log(data);
        props.onChange(pageIndex, index, data);
    };

    const Sensor = sensors[props.props.subtype];
    return (
        <Sensor
            index={props.index}
            pageIndex={props.pageIndex}
            onChange={props.onChange}
            config={props.props.config}
        />
    );

};

export default SensorElement;