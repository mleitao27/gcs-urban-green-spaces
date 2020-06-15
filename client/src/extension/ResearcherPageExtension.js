import React, { useState  } from 'react';

import axios from 'axios';
import config from './config';

import MainButton from '../components/MainButton';
import UGSList from './UGSList';

import ExpiredSessionPage from '../pages/ExpiredSessionPage';

const ResearcherPageExtension = props => {

    const [newugs, setNewugs] = useState([]);

    const renderNewUgsList = () => {
        const params = {
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/getUGS`, params)
        .then(res => {
            if (res.status === 200)
                setNewugs(res.data.ugs);
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.log(error.response.status);
                props.onLogout(false, '', '');
            }
        });
    };

    const removeUGS = (ugs, answer) => {
        const params = {
            ugs,
            answer,
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/removeUGS`, params)
        .then(res => {
            if (res.status === 200)
                renderNewUgsList();
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.log(error.response.status);
                props.onLogout(false, '', '');
            }
        });
    };

    const validateUGS = (ugs, answer) => {
        const params = {
            ugs,
            answer,
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/validateUGS`, params)
        .then(res => {
            if (res.status === 200)
                renderNewUgsList();
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.log(error.response.status);
                props.onLogout(false, '', '');
            }
        });
    };

    const editUGS = (ugs, answer, edit) => {
        const params = {
            ugs,
            answer,
            edit,
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/editUGS`, params)
        .then(res => {
            if (res.status === 200)
                renderNewUgsList();
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.log(error.response.status);
                props.onLogout(false, '', '');
            }
        });
    };

    let content = (
        <React.Fragment>
            <h1>Researcher Page</h1>
            <UGSList list={newugs} removeUGS={removeUGS} validateUGS={validateUGS} editUGS={editUGS} />
            <MainButton title='NEW UGS LIST' onClick={renderNewUgsList} />
        </React.Fragment>
    );
    if (newugs.length === 0)
        content = (
            <React.Fragment>
                <h1>Researcher Page</h1>
                <h3>No new UGS found in the database!</h3>
                <MainButton title='NEW UGS LIST' onClick={renderNewUgsList} />
            </React.Fragment>
        );

    if (!props.isLogged)
        content = <ExpiredSessionPage />;

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
};

export default ResearcherPageExtension;
    
