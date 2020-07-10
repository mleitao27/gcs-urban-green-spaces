var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');
var strings = require('./strings').strings;

const storeAnswer = async (email, answer, type) => {
    const result = await cache.get(email);
    // If user not in cache
    if (typeof result === 'undefined') res.status(404).send();
    else {
        if (type === 'map') {
            const markers = await db.getDocument('markers', {email});
            let marker = answer.find(m => m.id === strings.MAPPING_MARKER);
            let date = answer.find(m => m.id === strings.MAPPING_DATE);
            let time = answer.find(m => m.id === strings.MAPPING_TIME);

            let newMarker = {...marker.value, date: date.value, time: time.value};
            
            if (markers.length === 0) {
                db.insertDocument('markers', {email, markers: [newMarker]});
            }
            else {
                var temp = markers[0].markers;

                if (typeof temp.find(t => t.lat === answer[0].value.lat && t.long === answer[0].value.long) === 'undefined') {
                    temp.push(newMarker);
                    db.updateDocument('markers', {email}, {markers: temp});
                }
            }
        }
        else {
            const status = await db.getDocument('status', {user: email});
            if (status.length === 1) {
                if (type === 'base') {
                    const answers = await db.getDocument('answers', {_id: status[0].answer});
                    let answerData = [];
                    
                    if (answers.length === 1) answerData = answers[0].data;
                    answer.map(a => answerData.push(a));
    
                    await db.updateDocument('answers', {_id: status[0].answer}, {data: answerData});
                }
                else if (type === 'details') {
                    const newDetails = {
                        email: email,
                        details: answer
                    };
                    db.insertDocument('details', newDetails);
                }
            }
        }
    }
};

const storeForm = (req) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const surveys = await db.loadCollection('surveys');
            const json = await surveys.find().toArray();
            if (json.length > 0)
                await surveys.deleteOne({name: json[0].name});
            await surveys.insertOne(JSON.parse(req.body.json));
        }
    });
};

exports.storeAnswer = storeAnswer;
exports.storeForm = storeForm;
