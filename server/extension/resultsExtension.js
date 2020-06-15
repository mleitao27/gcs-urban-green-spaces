var express = require('express');

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

exports.getResults = getResults;