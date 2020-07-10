var express = require('express');
var mongodb = require('mongodb');

var db = require('../modules/db');
var cache = require('../modules/cache');

var config = require('./config');

const getResults = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            if (req.body.type === 'form') {
                res.status(200).send(await db.getDocument('answers', {user: req.body.email}));
            }
            else if (req.body.type === 'image') {
                if (typeof req.body.photo !== 'undefined')
                    res.status(200).send(await db.getDocument('photos', {_id: new mongodb.ObjectID(req.body.photo)}));         
                else if (typeof req.body.ugs !== 'undefined')
                    res.status(200).send(await db.getDocument('photos', {ugs: req.body.ugs}));
            }
            else if (req.body.type === 'map') {
                let markers = await db.getDocument('markers', {email: req.body.email});

                let markersByUGS = {};

                if (markers.length > 0) { 
                    const ugs = await db.getDocument('ugs', {});
    
                    markers[0].markers.map(m => {
                        const inUgs = getUGS({lat: m.lat, long: m.long}, ugs);
                        inUgs.map(iu => {
                            if (typeof markersByUGS[iu] === 'undefined') {
                                markersByUGS[iu] = [];
                                markersByUGS[iu].push(m);
                            } else markersByUGS[iu].push(m);
                        });
                    });
                }

                res.status(200).send(markersByUGS);
            }
        }
    });
};

const getUGS = (location, ugs) => {
    let inUgs = [];
    ugs.map(u => {
        if (calcDistance(u.lat, u.long, location.lat, location.long) < Math.round(Math.sqrt(parseFloat(u.area)/Math.PI)) + config.inUgsOffset)
            inUgs.push(u.name);
    });
    return inUgs;
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

exports.getResults = getResults;