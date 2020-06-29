var express = require('express');
var mongodb = require('mongodb');

var db = require('../modules/db');
var cache = require('../modules/cache');

const getUGS = async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const ugs = await db.getDocument('newugs', {});
            res.status(200).send({ugs});
        }
    });

};

const editUGS = async (req, res) => {

    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const edit = JSON.parse(req.body.edit);
            await db.updateDocument('newugs', {_id: new mongodb.ObjectID(req.body.ugs)}, edit);

            const answer = await db.getDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)});
            if (answer.length > 0) {
                let data = answer[0].data;
                data.map(d => {
                    if (d.name === 'What is this UGS name?') d.value = edit.name;
                    else if (d.name === 'What is its area?') d.value = edit.area;
                });

                await db.updateDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)}, {data});
            }
            
            res.status(200).send();
        }
    });

};

const removeUGS = async (req, res) => {

    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            await db.deleteDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)});
            await db.deleteDocument('newugs', {_id: new mongodb.ObjectID(req.body.ugs)});
            await db.deleteDocument('photos', {_id: req.body.photo !== '' ? new mongodb.ObjectID(req.body.photo) : req.body.photo});
            res.status(200).send();
        }
    });

};

const validateUGS = async (req, res) => {

    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            const newugs = await db.getDocument('newugs', {_id: new mongodb.ObjectID(req.body.ugs)});
            const ugs = await db.getDocument('ugs', {});
            const answer = await db.getDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)});
            const photo = await db.getDocument('photos', {_id: req.body.photo !== '' ? new mongodb.ObjectID(req.body.photo) : req.body.photo});

            if (newugs.length > 0)
                db.insertDocument('ugs', {
                    name: newugs[0].name,
                    area: newugs[0].area,
                    lat: String(newugs[0].geolocation.latitude),
                    long: String(newugs[0].geolocation.longitude),
                    id: `Lx${ugs.length+1}`
                });

            await db.deleteDocument('newugs', {_id: new mongodb.ObjectID(req.body.ugs)});

            if (answer.length > 0) {
                let data = answer[0].data;
                data.map(d => {
                    if (d.name === 'In which UGS are you?') d.value = newugs[0].name;
                });
                await db.updateDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)}, {data});
            }

            if (photo.length > 0) {
                await db.updateDocument('photos', {_id: new mongodb.ObjectID(req.body.photo)}, {valid: true, ugs: newugs[0].name});
            }

            res.status(200).send();
        }
    });

};

exports.getUGS = getUGS;
exports.editUGS = editUGS;
exports.removeUGS = removeUGS;
exports.validateUGS = validateUGS;