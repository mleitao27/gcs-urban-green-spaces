import React, { useState } from 'react';

import axios from 'axios';
import config from './config';

import MainButton from '../components/MainButton';
import UGSList from './UGSList';

import ExpiredSessionPage from '../pages/ExpiredSessionPage';

const ResearcherPageExtension = props => {

    const [newugs, setNewugs] = useState(null);

    const renderNewUgsList = () => {
        const params = {
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/getData`, params)
        .then(res => {
            if (res.status === 200) {
                setNewugs(res.data.ugs);
            }
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.log(error.response.status);
                props.onLogout(false, '', '');
            }
        });
    };

    const removeUGS = (ugs, answer, photo) => {
        const params = {
            ugs,
            answer,
            photo,
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/removeData`, params)
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

    const validateUGS = (ugs, answer, photo) => {
        const params = {
            ugs,
            answer,
            photo,
            email: props.userEmail
        };
        axios.post(`${config.serverURL}/api/researcher/validateData`, params)
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
        axios.post(`${config.serverURL}/api/researcher/editData`, params)
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

    let listContent = <React.Fragment />;
    if (newugs !== null) {
        if (newugs.length === 0)
            listContent = <h3>No new UGS found in the database!</h3>;
        else
            listContent = <UGSList list={newugs} email={props.userEmail} removeUGS={removeUGS} validateUGS={validateUGS} editUGS={editUGS} onLogout={props.onLogout}/>;
    }

    let content = (
        <React.Fragment>
            <h1>Researcher Page</h1>
            {listContent}
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
    
