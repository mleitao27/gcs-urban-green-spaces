var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');
var config = require('./config');

var baseArray = require('./baseArray').baseArray;
const errorJSON = require('./data/error.json');
const detailsJSON = require('./data/details.json');
const mappingJSON = require('./data/mapping.json');

var feedback = require('./feedbackExtension');
var dbStorage = require('./dbExtension');

var fs = require('fs');

const IN_UGS = 0;
const NOT_UGS = 1;
const UGS_LIST = 2;
const ADD_UGS = 3;
const ABOUT_UGS = 4;
const NEW_UGS = 5;
const ANIMALS = 6;
const VEGETATION = 7;
const MANMADE = 8;
const ANIMALS_OTHER = 9;
const VEGETATION_OTHER = 10;
const MANMADE_OTHER = 11;
const MOTIVATION = 12;
const MOTIVATION_OTHER = 13;
const FEELING = 14;
const END = 15;
const GOOGLE = 16;
const YNGOOGLE = 17;
const SKIPSURVEY = 18;
const SENSORS = 19;

const getForm = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            if (req.body.type === 'map') res.status(200).send({form: mappingJSON, type: 'map'});
            else if (req.body.type === 'form') {

                const status = await db.getDocument('status', {user: req.body.email});
                const details = await db.getDocument('details', {email: req.body.email});
                
                if (status.length === 0) {
                    const newStatus = {
                        user: req.body.email,
                        base: details.length === 1 ? 0 : -1,
                        details: details.length === 1 ? true : false,
                        geolocation: null,
                        weather: null,
                        googlefit: null,
                        answer: await resetAnswer(req.body.email)
                    };
                    
                    db.insertDocument('status', newStatus);
                    res.status(200).send(details.length === 1 ? {form: baseArray[0], type: 'base'} : {form: detailsJSON, type: 'details'});
                    
                } else if (status.length === 1) {
                    if (status[0].details === false) detailsSurvey(req, res);
                    else {
                        const answer = await db.getDocument('answers', {_id: status[0].answer});
                        if (req.body.status !== status[0].base) {
                            db.updateDocument('status', {user: req.body.email}, {base: 0, answer: await resetAnswer(req.body.email)});
                            if (answer.length === 1 && answer[0].done === false) {
                                db.deleteDocument('answers', {_id: status[0].answer});
                            }
                            res.status(200).send({form: baseArray[0], type: 'base'});
                        } else baseSurvey(req, res, status[0]);
                    }
                } else {
                    res.status(200).send({form: errorJSON});
                }
            }
        }
    });
};

const baseSurvey = async (req, res, status) => {
    var form = baseArray[status.base];
    if (status.base === IN_UGS) {
        const oldAnswer = await db.getDocument('answers', {_id: status.answer});
        if (oldAnswer.length !==0 && oldAnswer[0].data.length === 0) db.deleteDocument('answers', {_id: status.answer});
        db.updateDocument('status', {user: req.body.email}, {answer: await resetAnswer(req.body.email)});
    }
    else if (status.base === NOT_UGS) {
        db.deleteDocument('answers', {_id: status.answer});
    }
    else if (status.base === UGS_LIST) {

        // Get position
        // Calculate distance
        const ugs = await db.getDocument('ugs', {});
        var choices = [];
        var ids = [];
        if (ugs.length > 0)
            ugs.map(space => {
                if (calcDistance(parseFloat(space.lat), parseFloat(space.long), parseFloat(status.geolocation.lat), parseFloat(status.geolocation.long)) <= Math.round(Math.sqrt(parseFloat(space.area)/Math.PI)) + config.inUgsOffset) {
                    if (typeof ids.find(element => element === space.id) === 'undefined') {
                        ids.push(space.id);
                        choices.push(space.name);
                    }
                }
            });
        choices.push('Other');

        var content = baseArray[2];
        
        content.pages[0].elements[0].choices = choices;

        form = content;
        
    }
    else if (status.base === END) {
        db.updateDocument('answers', {_id: status.answer}, {done: true});
        form = {weather: status.weather, googlefit: status.googlefit}
    }
    
    res.status(200).send({form, type: 'base'});
};

const detailsSurvey = (req, res) => {
    res.status(200).send({form: detailsJSON, type: 'details'});
};

const getMarkers = async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const markers = await db.getDocument('markers', {email: req.body.email});
            if (markers.length > 0)
                res.status(200).send(markers[0]);
        }
    });
};

const processAnswer = async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            console.log(req.body);
            
            // Immediate Feedback
            feedback.immediateFeedback();
            // Differenciated Feedback
            feedback.diffFeedback();
            // Database storage
            const status = await db.getDocument('status', {user: req.body.email});
            dbStorage.storeAnswer(req.body.email, req.body.answer, req.body.type);

            var newStatus;
            if (req.body.type === 'base') {
                newStatus = await getNewStatus(req.body.email, status[0].base, {data: req.body.answer, id: status[0].answer});
                db.updateDocument('status', {user: req.body.email}, {base: newStatus});
                res.status(200).send({status: newStatus});
            }
            else if (req.body.type === 'details') {
                newStatus = 0;
                db.updateDocument('status', {user: req.body.email}, {base: newStatus, details: true});
                res.status(200).send({status: newStatus});
            }
            else if (req.body.type === 'map') {
                res.status(200).send();
            }
            
            
        }
    });
};

const processImage = async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {            
            res.status(200).send(await db.insertDocument('photos', {email: req.body.email, valid: false, base64: req.body.image_data}));
        }
    });
};

const getNewStatus = async (email, oldStatus, answer) => {
    
    let other;
    let status;
    let answers;
    
    if (oldStatus === IN_UGS) {
        if (answer.data[0].value === false) return NOT_UGS;
        else {
            
            status = await db.getDocument('status', {user: email});
            answers = await db.getDocument('answers', {user: email});

            if (typeof answers.find(a => Math.abs(a.timestamp - new Date()) < 1000 * config.recentAnswer && JSON.stringify(status[0].answer) !== JSON.stringify(a._id)) != 'undefined')
                return SKIPSURVEY;

            return SENSORS;
        }
    }
    else if (oldStatus === SKIPSURVEY) {
        if (answer.data[0].value === false) return SENSORS;
        else {
            status = await db.getDocument('status', {user: email});
            db.deleteDocument('answers', {_id: status[0].answer});
            return END;
        }
    }
    else if (oldStatus === SENSORS) {
        
        answer.data.map(d => {
            if (d.name === 'geolocation')
                db.updateDocument('status', {user: email}, {geolocation: {lat: d.value.data.latitude, long: d.value.data.longitude}});
            else if (d.name === 'weather')
                db.updateDocument('status', {user: email}, {weather: d.value.data});
        });
        
        return YNGOOGLE;
    }
    else if (oldStatus === YNGOOGLE) {
        if (answer.data[0].value === false) return UGS_LIST;
        else return GOOGLE;
    }
    else if (oldStatus === GOOGLE) {
        answer.data.map(d => {
            if (d.name === 'googlefit')
                db.updateDocument('status', {user: email}, {googlefit: d.value.data});
        });
        return UGS_LIST;
    }
    else if (oldStatus === NOT_UGS) {
        return NOT_UGS;
    }
    else if (oldStatus === UGS_LIST) {
        if (answer.data[0].value === 'Other') return NEW_UGS;
        else if (answer.data[0].value === '') return ADD_UGS;
        else return ABOUT_UGS;
    }
    else if (oldStatus === ADD_UGS) {
        if (answer.data[0].value === false) return NOT_UGS;
        else return NEW_UGS;
    }
    else if (oldStatus === ABOUT_UGS) {
        return ANIMALS;
    }
    else if (oldStatus === NEW_UGS) {
        db.insertDocument('newugs', {
            name: answer.data.find(a => a.name === 'What is this UGS name?').value,
            area: answer.data.find(a => a.name === 'What is its area?').value,
            geolocation: answer.data.find(a => a.name === 'geolocation').value.data,
            photo: answer.data.find(a => a.name === 'What does the UGS looks like?').value,
            answer: answer.id
        });
        return ABOUT_UGS;
    }
    else if (oldStatus === ANIMALS) {
        other = false;
        answer.data[0].value.map(a => {
            if (a === 'other') other = true;
        });

        if (other == true) return ANIMALS_OTHER;
        else return VEGETATION;
    }
    else if (oldStatus === VEGETATION) {
        other = false;
        answer.data[0].value.map(a => {
            if (a === 'other') other = true;
        });
        
        if (other == true) return VEGETATION_OTHER;
        else return MANMADE;
    }
    else if (oldStatus === MANMADE) {
        other = false;
        answer.data[0].value.map(a => {
            if (a === 'other') other = true;
        });
        
        if (other == true) return MANMADE_OTHER;
        else return MOTIVATION;
    }
    else if (oldStatus === MOTIVATION) {
        other = false;
        answer.data[0].value.map(a => {
            if (a === 'other') other = true;
        });
        
        if (other == true) return MOTIVATION_OTHER;
        else return FEELING;
    }
    else if (oldStatus === ANIMALS_OTHER) {
        return VEGETATION;
    }
    else if (oldStatus === VEGETATION_OTHER) {
        return MANMADE;
    }
    else if (oldStatus === MANMADE_OTHER) {
        return MOTIVATION;
    }
    else if (oldStatus === MOTIVATION_OTHER) {
        return FEELING;
    }
    else if (oldStatus === FEELING) {
        return END;
    }
    else if (oldStatus === END) {
        return END;
    }
    
};

const returnFeedback = (req, res) => {
    
};

const submitForm = (req, res) => {
    
};

const resetAnswer = (email) => {
    const newAnswer = {
        user: email,
        timestamp: new Date(),
        data: [],
        done: false
    };

    return db.insertDocument('answers', newAnswer);
};

const calcDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const Q1 = lat1 * Math.PI/180; // φ, λ in radians
    const Q2 = lat2 * Math.PI/180;
    const deltaQ = (lat2-lat1) * Math.PI/180;
    const deltaL = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaQ/2) * Math.sin(deltaQ/2) +  Math.cos(Q1) * Math.cos(Q2) * Math.sin(deltaL/2) * Math.sin(deltaL/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
};

exports.getForm = getForm;
exports.submitForm = submitForm;
exports.processAnswer = processAnswer;
exports.processImage = processImage;
exports.returnFeedback = returnFeedback;
exports.getMarkers = getMarkers;