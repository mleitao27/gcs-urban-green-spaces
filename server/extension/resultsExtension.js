var express = require('express');
var mongodb = require('mongodb');

var db = require('../modules/db');
var cache = require('../modules/cache');

const getResults = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            res.status(200).send(await db.getDocument('answers', {user: req.body.email}));            
        }
    });
};

const getImageResults = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            if (typeof req.body.photo !== 'undefined')
                res.status(200).send(await db.getDocument('photos', {_id: new mongodb.ObjectID(req.body.photo)}));         
            else if (typeof req.body.ugs !== 'undefined')
                res.status(200).send(await db.getDocument('photos', {ugs: req.body.ugs}));         
        }
    });
};

exports.getResults = getResults;
exports.getImageResults = getImageResults;