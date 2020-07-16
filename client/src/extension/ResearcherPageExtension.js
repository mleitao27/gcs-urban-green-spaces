import React, { useState } from 'react';

import axios from 'axios';
import config from './config';

import MainButton from '../components/MainButton';
import List from './List';
import UGSItem from './UGSItem';
import AnswerItem from './AnswerItem';

import ExpiredSessionPage from '../pages/ExpiredSessionPage';

import Filter from './Filter';

const ResearcherPageExtension = props => {

    const [newugs, setNewugs] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [dummy, setDummy] = useState(true);

    const [filters, setFilters] = useState({
        BASE_ABOUT_UGS: [
            {value: "One of my favourites", selected: false},
            {value: "Meh", selected: false},
            {value: "Avoid it", selected: false},
            {value: "", selected: false}
        ],  
        BASE_ANIMAL: [
            {value: "bird", selected: false},
            {value: "insect", selected: false},
            {value: "squirrel", selected: false},
            {value: "lizard", selected: false},
            {value: "other", selected: false},
            {value: "", selected: false}
        ],
        BASE_VEGETATION: [
            {value: "tree", selected: false},
            {value: "bush", selected: false},
            {value: "flower", selected: false},
            {value: "mushroom", selected: false},
            {value: "other", selected: false},
            {value: "", selected: false}
        ],
        BASE_MANMADE: [
            {value: "bench", selected: false},
            {value: "gazebo", selected: false},
            {value: "swing", selected: false},
            {value: "kiosk", selected: false},
            {value: "other", selected: false},
            {value: "", selected: false}
        ],
        BASE_MOTIVATION: [
            {value: "meditation", selected: false},
            {value: "child", selected: false},
            {value: "jogging", selected: false},
            {value: "group", selected: false},
            {value: "dog", selected: false},
            {value: "other", selected: false},
            {value: "", selected: false}
        ],
        BASE_FEELING: [
            {value: 1, selected: false},
            {value: 2, selected: false},
            {value: 3, selected: false},
            {value: 4, selected: false},
            {value: 5, selected: false}
        ]
    });

    const [toggleFilters, setToggleFilters] = useState({
        BASE_ABOUT_UGS: false,  
        BASE_ANIMAL: false,
        BASE_VEGETATION: false,
        BASE_MANMADE: false,
        BASE_MOTIVATION: false,
        BASE_FEELING: false
    });

    const getFilters = () => {
        const categ = ['BASE_ABOUT_UGS', 'BASE_ANIMAL', 'BASE_VEGETATION', 'BASE_MANMADE', 'BASE_MOTIVATION', 'BASE_FEELING'];
        let finalFilters = [];

        categ.map(c => {
            let temp = [];
            filters[c].map(f => {
                if (f.selected) temp.push(f.value);
            });
            finalFilters.push({filter: c, values: temp});
        });
        
        return finalFilters;
    };

    const renderNewUgsList = () => {
        const params = {
            email: props.userEmail,
            data: 'newugs'
        };
        axios.post(`${config.serverURL}/api/researcher/getData`, params)
        .then(res => {
            if (res.status === 200) {
                setNewugs(res.data.data);
            }
        })
        .catch(error => {
            if (error.response.status === 403) {
                console.log(error.response.status);
                props.onLogout(false, '', '');
            }
        });
    };

    const renderAnswersList = () => {
        const params = {
            email: props.userEmail,
            data: 'answers',
            filters: getFilters()
        };
        axios.post(`${config.serverURL}/api/researcher/getData`, params)
        .then(res => {
            if (res.status === 200) {
                setAnswers(res.data.data);
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
            email: props.userEmail,
            data: 'newugs'
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

    const removeAnswer = (answer) => {
        const params = {
            answer,
            email: props.userEmail,
            data: 'answers'
        };
        axios.post(`${config.serverURL}/api/researcher/removeData`, params)
        .then(res => {
            if (res.status === 200)
                renderAnswersList();
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

    let UGSlistContent = <React.Fragment />;
    if (newugs !== null) {
        if (newugs.length === 0)
            UGSlistContent = <h3>No new UGS found in the database!</h3>;
        else
            UGSlistContent = (
                <List
                    list={newugs}
                    item={UGSItem}
                    email={props.userEmail}
                    onLogout={props.onLogout}
                    removeUGS={removeUGS}
                    validateUGS={validateUGS}
                    editUGS={editUGS}
                />
            );
    }

    let answersListContent = <React.Fragment />;
    if (answers !== null) {
        if (answers.length === 0)
            answersListContent = <h3>No answers found in the database!</h3>;
        else
            answersListContent = (
                <List
                    list={answers}
                    item={AnswerItem}
                    email={props.userEmail}
                    onLogout={props.onLogout}
                    removeAnswer={removeAnswer}
                />
            );
    }

    const changeFilter = (value, filter) => {
        var temp = filters;
        temp[filter].map(t => {
            if (t.value === value) t.selected = !t.selected;
        });
        setFilters(temp);
        setDummy(!dummy);
    };

    const toggleFilter = (value, filter) => {
        var temp = filters;
        temp[filter].map(t => {
            t.selected = value;
        });
        setFilters(temp);
        
        temp = toggleFilters;
        temp[filter] = value;
        setToggleFilters(temp);
        setDummy(!dummy);
    };

    let content = (
        <React.Fragment>
            <h1>Researcher Page</h1>
            <MainButton title='NEW UGS LIST' onClick={renderNewUgsList} />
            {UGSlistContent}
            <MainButton title='ANSWER LIST' onClick={renderAnswersList} />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Filter 
                    title={'Opinion about the UGS'} 
                    fields={filters.BASE_ABOUT_UGS} 
                    toggle={toggleFilters.BASE_ABOUT_UGS} 
                    changeFilter={changeFilter} 
                    toggleFilter={toggleFilter} 
                    filter={'BASE_ABOUT_UGS'}
                />
                <Filter 
                    title={'Animal Elements'} 
                    fields={filters.BASE_ANIMAL} 
                    toggle={toggleFilters.BASE_ANIMAL} 
                    changeFilter={changeFilter} 
                    toggleFilter={toggleFilter} 
                    filter={'BASE_ANIMAL'}
                />
                <Filter 
                    title={'Vegetation Elements'} 
                    fields={filters.BASE_VEGETATION} 
                    toggle={toggleFilters.BASE_VEGETATION} 
                    changeFilter={changeFilter} 
                    toggleFilter={toggleFilter} 
                    filter={'BASE_VEGETATION'}
                />
                <Filter 
                    title={'Man made Elements'} 
                    fields={filters.BASE_MANMADE} 
                    toggle={toggleFilters.BASE_MANMADE} 
                    changeFilter={changeFilter} 
                    toggleFilter={toggleFilter} 
                    filter={'BASE_MANMADE'}
                />
                <Filter 
                    title={'Motivation'} 
                    fields={filters.BASE_MOTIVATION} 
                    toggle={toggleFilters.BASE_MOTIVATION} 
                    changeFilter={changeFilter} 
                    toggleFilter={toggleFilter} 
                    filter={'BASE_MOTIVATION'}
                />
                <Filter 
                    title={'Feeling'}
                    fields={filters.BASE_FEELING} 
                    toggle={toggleFilters.BASE_FEELING} 
                    changeFilter={changeFilter} 
                    toggleFilter={toggleFilter} 
                    filter={'BASE_FEELING'}
                />
            </div>
            {answersListContent}
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
    
