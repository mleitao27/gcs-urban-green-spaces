var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

const detailsJSON = require('./data/details.json');

const getProfile = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const user = await db.getDocument('users', {email: req.body.email});
            const details = await db.getDocument('details', {email: req.body.email});

            if (details.length === 1)
                res.status(200).send({
                    name: user[0].name,
                    email: user[0].email,
                    type: user[0].type,
                    birth: details[0].details[1].value,
                    zip: details[0].details[2].value,
                    gender: details[0].details[3].value,
                    education: details[0].details[4].value,
                    income: details[0].details[5].value,
        
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

const editProfileGET = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        res.status(200).send(detailsJSON);
    });
};

const editProfilePOST = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        
        const details = await db.getDocument('details', {email: req.body.email});

        if (details.length === 1)
            await db.updateDocument('details', {email: req.body.email}, {details: req.body.details});
        else {
            await db.insertDocument('details', {email: req.body.email, details: req.body.details});
        }
        res.status(200).send();
    });
};

exports.getProfile = getProfile;
exports.editProfileGET = editProfileGET;
exports.editProfilePOST = editProfilePOST;