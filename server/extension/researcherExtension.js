var express = require('express');
var mongodb = require('mongodb');

var db = require('../modules/db');
var cache = require('../modules/cache');

var strings = require('./strings').strings;

const getData = async (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        let data;
        let finalData = [];
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            if (req.body.data === 'newugs') {
                data = await db.getDocument(req.body.data, {});
                res.status(200).send({data});
            }
            else if (req.body.data === 'answers') {
                data = await db.getDocument(req.body.data, {});
                let inArray = false;
                
                data.map(d => {
                    if (d.done) {
                        if (typeof finalData.find(fd => d._id === fd._id) === 'undefined') finalData.push(d);
                        d.data.map(q => {
                            req.body.filters.map(f => {
                                if (q.id === f.filter) {
                                    if(f.values.length > 0) {
                                        if (typeof q.value === 'object') {
                                            if (q.value.length === 0)
                                                if (typeof finalData.find(fd => d._id === fd._id) !== 'undefined'){
                                                    finalData.pop();
                                                }
                                            f.values.map(fv => {
                                                if (q.value.includes(fv) === false){
                                                    if (typeof finalData.find(fd => d._id === fd._id) !== 'undefined'){
                                                        finalData.pop();
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            if (f.values.includes(q.value) === false){ 
                                                if (typeof finalData.find(fd => d._id === fd._id) !== 'undefined'){
                                                    finalData.pop();
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
                data = finalData;
                res.status(200).send({data});
            }
        }
    });
};

const editData = async (req, res) => {

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
                    if (d.id === strings.BASE_NEW_UGS_NAME) d.value = edit.name;
                    else if (d.id === strings.BASE_NEW_UGS_AREA) d.value = edit.area;
                });

                await db.updateDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)}, {data});
            }
            
            res.status(200).send();
        }
    });

};

const removeData = async (req, res) => {

    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(403).send();
        else {
            if (req.body.data === 'newugs') {
                await db.deleteDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)});
                await db.deleteDocument('newugs', {_id: new mongodb.ObjectID(req.body.ugs)});
                await db.deleteDocument('photos', {_id: req.body.photo !== '' ? new mongodb.ObjectID(req.body.photo) : req.body.photo});
            } else if (req.body.data === 'answers') {
                await db.deleteDocument('answers', {_id: new mongodb.ObjectID(req.body.answer)});
            }
            res.status(200).send();
        }
    });

};

const validateData = async (req, res) => {

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
                    if (d.id === strings.BASE_UGS_LIST) d.value = newugs[0].name;
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

exports.getData = getData;
exports.editData = editData;
exports.removeData = removeData;
exports.validateData = validateData;