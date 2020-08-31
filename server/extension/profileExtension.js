var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

var config = require('./config');
var strings = require('./strings').strings;

var surveysArray = require('./surveys/surveysArray').surveysArray;

const getProfile = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const user = await db.getDocument('users', {email: req.body.email});
            const details = await db.getDocument('details', {email: req.body.email});

            if (details.length === 1)
                res.status(200).send({
                    name: user[0].name,
                    email: user[0].email,
                    type: user[0].type,
                    birth: details[0].details.find(detail => detail.id === strings.DETAILS_BIRTH).value,
                    zip: details[0].details.find(detail => detail.id === strings.DETAILS_ZIP).value,
                    gender: details[0].details.find(detail => detail.id === strings.DETAILS_GENDER).value,
                    education: details[0].details.find(detail => detail.id === strings.DETAILS_EDUCATION).value,
                    income: details[0].details.find(detail => detail.id === strings.DETAILS_INCOME).value,
                    frequency: details[0].details.find(detail => detail.id === strings.DETAILS_FREQUENCY).value,
                    timeofday: details[0].details.find(detail => detail.id === strings.DETAILS_TIMEOFDAY).value,
                    timeofweek: details[0].details.find(detail => detail.id === strings.DETAILS_TIMEOFWEEK).value,
                    transportation: details[0].details.find(detail => detail.id === strings.DETAILS_TRANSPORTATION).value
                });
            else
                res.status(200).send({
                    name: user[0].name,
                    email: user[0].email,
                    type: user[0].type,
                    birth: '',
                    zip: '',
                    gender: '',
                    education: '',
                    income: '',
                    frequency: '',
                    timeofday: '',
                    timeofweek: '',
                    transportation: ''
                }); 
        }
    });
};

const editProfileRequest = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        if (typeof result === 'undefined') res.status(403).send();
        else {
            res.status(200).send(surveysArray.detailsSurvey[req.body.language]);
        }
    });
};

const editProfile = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const details = await db.getDocument('details', {email: req.body.email});

            if (details.length === 1)
                await db.updateDocument('details', {email: req.body.email}, {details: req.body.details});
            else {
                await db.insertDocument('details', {email: req.body.email, details: req.body.details});
            }
            res.status(200).send();
        }
    });
};

exports.getProfile = getProfile;
exports.editProfileRequest = editProfileRequest;
exports.editProfile = editProfile;