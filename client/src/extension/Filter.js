import React from 'react';
import { IoIosCheckboxOutline, IoIosSquareOutline, IoIosCheckbox } from "react-icons/io";


const Filter = props => {
    let ToggleIcon = props.toggle ? IoIosCheckbox : IoIosSquareOutline;
    return(
        <div>
            <p style={styles.field}><ToggleIcon style={styles.icon} onClick={props.toggleFilter.bind(this, !props.toggle, props.filter)}/>{props.title}</p>
        {
            props.fields.map(f => {
                let Icon = f.selected ? IoIosCheckboxOutline : IoIosSquareOutline;
                return(<p key={f.value} style={styles.field}><Icon style={styles.icon} onClick={props.changeFilter.bind(this, f.value, props.filter)}/>{f.value}</p>);
            })
        }
        </div>
    );
};

const styles = {
    field: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        color: '#333',
        fontSize: 36
    }
};

export default Filter;