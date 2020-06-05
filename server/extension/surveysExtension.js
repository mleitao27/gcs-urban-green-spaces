var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

var baseArray = require('./baseArray').baseArray;
const errorJSON = require('./data/error.json');
const detailsJSON = require('./data/details.json');

var feedback = require('./feedbackExtension');
var dbStorage = require('./dbExtension');

var fs = require('fs');

const getForm = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const status = await db.getDocument('status', {user: req.body.email});
            const details = await db.getDocument('details', {email: req.body.email});

            if (status.length === 0) {
                const newStatus = {
                    user: req.body.email,
                    base: details.length === 1 ? 0 : -1,
                    details: details.length === 1 ? true : false,
                    geolocation: null,
                    answer: await resetAnswer(req.body.email)
                };

                db.insertDocument('status', newStatus);
                res.status(200).send(details.length === 1 ? {form: baseArray[0], type: 'base'} : {form: detailsJSON, type: 'details'});

            } else if (status.length === 1) {
                if (status[0].details === false) detailsSurvey(req, res);
                else {
                    if (req.body.status !== status[0].base) {
                        db.updateDocument('status', {user: req.body.email}, {base: 0, answer: await resetAnswer(req.body.email)});
                        db.deleteDocument('answers', {_id: status[0].answer});
                        res.status(200).send({form: baseArray[0], type: 'base'});
                    } else baseSurvey(req, res, status[0]);
                }
            } else {
                res.status(200).send({form: errorJSON});
            }
        }
    });
};

const baseSurvey = async (req, res, status) => {
    if (status.base === 0) {
        const oldAnswer = await db.getDocument('answers', {_id: status.answer});
        if (oldAnswer.length !==0 && oldAnswer[0].data.length === 0) db.deleteDocument('answers', {_id: status.answer});
        db.updateDocument('status', {user: req.body.email}, {answer: await resetAnswer(req.body.email)});
    }
    else if (status.base === 1) {
        db.deleteDocument('answers', {_id: status.answer});
    }
    else if (status.base === 2) {

        // Get position
        // Calculate distance
        const ugs = await db.getDocument('ugs', {});
        var choices = [];
        ugs.map(space => {
            if (calcDistance(parseFloat(space.lat), parseFloat(space.long), parseFloat(status.geolocation.lat), parseFloat(status.geolocation.long)) <= Math.round(Math.sqrt(parseFloat(space.area)/Math.PI)))
            choices.push(space.name);
        });
        choices.push('Other');

        var content = baseArray[2];
        
        content.pages[0].elements[0].choices = choices;

        fs.writeFile('./extension/data/base2.json', JSON.stringify(content), function (err) {
            if (err) throw err;
        });
        
    }
    
    res.status(200).send({form: baseArray[status.base], type: 'base'});
};

const detailsSurvey = (req, res) => {
    res.status(200).send({form: detailsJSON, type: 'details'});
};

const processAnswer = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            console.log(req.body);
            
            // Immediate Feedback
            feedback.immediateFeedback();
            // Differenciated Feedback
            feedback.diffFeedback();
            // Database storage
            dbStorage.storeAnswer(req.body.email, req.body.answer, req.body.type);
            
            const status = await db.getDocument('status', {user: req.body.email});
            
            var newStatus;
            if (req.body.type === 'base') {
                newStatus = getNewStatus(req.body.email, status[0].base, req.body.answer);
                db.updateDocument('status', {user: req.body.email}, {base: newStatus});
            }
            else if (req.body.type === 'details') {
                newStatus = 0;
                db.updateDocument('status', {user: req.body.email}, {base: newStatus, details: true});
            }
            
            res.status(200).send({status: newStatus});
        }
    });
};

const getNewStatus = (email, oldStatus, answer) => {
    
    let other;
    
    if (oldStatus === 0) {
        if (answer[0].value === false) return 1;
        else {
            db.updateDocument('status', {user: email}, {geolocation: {lat: answer[1].value.data.latitude, long: answer[1].value.data.longitude}});
            return 2;
        }
    }
    else if (oldStatus === 2) {
        if (answer[0].value === 'Other') return 3;
        else return 4;
    }
    else if (oldStatus === 3) {
        if (answer[0].value === false) return 4;
        else return 5;
    }
    else if (oldStatus === 4) {
        return 6;
    }
    else if (oldStatus === 5) {
        return 4;
    }
    else if (oldStatus === 6) {
        other = false;
        answer[0].value.map(a => {
            if (a === 'other') other = true;
        });

        if (other == true) return 9;
        else return 7;
    }
    else if (oldStatus === 7) {
        other = false;
        answer[0].value.map(a => {
            if (a === 'other') other = true;
        });
        
        if (other == true) return 10;
        else return 8;
    }
    else if (oldStatus === 8) {
        other = false;
        answer[0].value.map(a => {
            if (a === 'other') other = true;
        });
        
        if (other == true) return 11;
        else return 12;
    }
    else if (oldStatus === 9) {
        return 7;
    }
    else if (oldStatus === 10) {
        return 8;
    }
    else if (oldStatus === 11) {
        return 12;
    }
    else if (oldStatus === 12) {
        return 13;
    }
    else if (oldStatus === 13) {
        return 13;
    }
    
};

const returnFeedback = (req, res) => {
    
};

const submitForm = (req, res) => {
    
};

const mapSurvey = () => {
    res.status(200).send({form: baseArray[0]});
};

const resetAnswer = (email) => {
    const newAnswer = {
        user: email,
        timestamp: new Date(),
        data: []
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
exports.returnFeedback = returnFeedback;