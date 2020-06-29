import React from 'react';
import UGSItem from './UGSItem';

const UGSList = props => {

    return (
        props.list.map(ugs => {
            return (
                <UGSItem
                    key={ugs._id}
                    ugs={ugs}
                    removeUGS={props.removeUGS}
                    validateUGS={props.validateUGS}
                    editUGS={props.editUGS}
                    onLogout={props.onLogout}
                    email={props.email}
                />
            );
        })
    );
};

export default UGSList;