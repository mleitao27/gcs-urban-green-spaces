var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

const storeAnswer = async (email, answer, type) => {
    const result = await cache.get(email);
    // If user not in cache
    if (typeof result === 'undefined') res.status(404).send();
    else {
        const status = await db.getDocument('status', {user: email});
        if (status.length === 1) {
            if (type === 'base') {
                const answers = await db.getDocument('answers', {_id: status[0].answer});
                let answerData = [];
                if (answer.length === 1) answerData = answers[0].data;
                
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
