var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

const detailsJSON = require('./data/details.json');

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
                    birth: details[0].details.find(detail => detail.name === 'Date of Birth').value,
                    zip: details[0].details.find(detail => detail.name === 'ZIP Code').value,
                    gender: details[0].details.find(detail => detail.name === 'Gender').value,
                    education: details[0].details.find(detail => detail.name === 'Education').value,
                    income: details[0].details.find(detail => detail.name === 'Income').value
        
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
        
                }); 
        }
    });
};

const requestEditProfile = (req, res) => {
    console.log(req.body.email);
    cache.get(req.body.email)
    .then(async result => {
        if (typeof result === 'undefined') res.status(403).send();
        else {
            res.status(200).send(detailsJSON);
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
exports.requestEditProfile = requestEditProfile;
exports.editProfile = editProfile;