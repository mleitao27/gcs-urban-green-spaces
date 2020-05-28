var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

const storeAnswer = async (req) => {
    const result = await cache.get(req.body.email);
    // If user not in cache
    if (typeof result === 'undefined') res.status(404).send();
    else {
        const status = await db.getDocument('status', {user: req.body.email});
        if (status.length === 1) {
            const answer = await db.getDocument('answers', {_id: status[0].answer});
            console.log(status);
            let answerData = [];
            if (answer.length === 1) answerData = answer[0].data;

            req.body.answer.map(a => answerData.push(a));
            await db.updateDocument('answers', {_id: status[0].answer}, {data: answerData});
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
