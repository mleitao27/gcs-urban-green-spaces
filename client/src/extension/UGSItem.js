import React, { useState, useEffect } from 'react';
import { IoIosRemoveCircle, IoIosAddCircle, IoMdCreate, IoIosSend } from "react-icons/io";
import config from './config';
import axios from 'axios';

const UGSItem = props => {

    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(`{"name": "${props.ugs.name}", "area": "${props.ugs.area}"}`);
    const [newugsPhoto, setNewugsPhoto] = useState(null);

    useEffect(() => {
        (async () => {
            if (props.ugs.photo !== '') {
                const params = {
                    email: props.email,
                    photo: props.ugs.photo
                };
                axios.post(`${config.serverURL}/api/results/image`, params)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.length > 0)
                            setNewugsPhoto(`data:image/png;base64,${res.data[0].base64}`);
                    }
                })
                .catch(error => {
                    if (error.response.status === 403) {
                        console.log(error.response.status);
                        props.onLogout(false, '', '');
                    }
                });
            };
        })();
    }, []);
    
    const edit = () => {
        props.editUGS(props.ugs._id, props.ugs.answer, editValue);
        setEditing(!editing);
    };

    const changeEditValue = newValue => {
        setEditValue(newValue.target.value);
    }

    let editBox = <div></div>;
    if (editing === true) {
        editBox = (
            <div style={styles.itemContainer}>
                <input style={{display: 'flex', width: '50%'}} type="text" id="fname" name="fname" defaultValue={editValue} onChange={changeEditValue}/>
                <IoIosSend style={{color: '#333', fontSize: 36}} onClick={edit} />
            </div>
        );
    }

    //<img src="" alt="UGS photo">
    let imageContent = <React.Fragment/>;
    if (newugsPhoto !== null) {
        imageContent = <div style={styles.cropImage}><img style={styles.image} src={newugsPhoto} alt="UGS photo"/></div>;
    }
    return (
        <React.Fragment>
            <div style={styles.itemContainer}>
                <p style={{display: 'flex', alignItems: 'center'}}>
                {props.ugs.name} - {props.ugs.area} - {props.ugs.geolocation.street}, {props.ugs.geolocation.postalCode}, {props.ugs.geolocation.city}, {props.ugs.geolocation.country} - (lat: {props.ugs.geolocation.latitude}, long: {props.ugs.geolocation.longitude})
                </p>
                {imageContent}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IoMdCreate style={{color: '#333', fontSize: 36}} onClick={() => setEditing(!editing)} />
                    <IoIosAddCircle style={{color: '#32cd32', fontSize: 36}} onClick={props.validateUGS.bind(this, props.ugs._id, props.ugs.answer, props.ugs.photo)} />
                    <IoIosRemoveCircle style={{color: '#cc0000', fontSize: 36}} onClick={props.removeUGS.bind(this, props.ugs._id, props.ugs.answer, props.ugs.photo)} />
                </div>
            </div>
            {editBox}
        </React.Fragment>
    );
};

// Styling
const styles = {
    itemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderBottom: '1px #ccc dotted',
        fontSize: 16
    },
    image: {
        width: '100%'
    },
    cropImage: {
        width: window.innerWidth*0.1,
        height: window.innerWidth*0.1,
        overflow: 'hidden'
    }
};

export default UGSItem;