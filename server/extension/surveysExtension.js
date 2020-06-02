var express = require('express');

var db = require('../modules/db');
var cache = require('../modules/cache');

var baseArray = require('./baseArray').baseArray;
const errorJSON = require('./data/error.json');

var feedback = require('./feedbackExtension');
var dbStorage = require('./dbExtension');

const getForm = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            const status = await db.getDocument('status', {user: req.body.email});

            if (status.length === 0) {
                
                const newStatus = {
                    user: req.body.email,
                    base: 0,
                    answer: await resetAnswer(req.body.email)
                };

                db.insertDocument('status', newStatus);
                res.status(200).send(baseArray[0]);
            } else if (status.length === 1) {
                if (req.body.status !== status[0].base) {
                    db.updateDocument('status', {user: req.body.email}, {base: 0, answer: await resetAnswer(req.body.email)});
                    db.deleteDocument('answers', {_id: status[0].answer});
                    res.status(200).send(baseArray[0]);
                } else baseSurvey(req, res, status[0].base, status[0].answer);
            } else {
                res.status(200).send(errorJSON);
            }
        }
    });
};

const resetAnswer = (email) => {
    const newAnswer = {
        user: email,
        timestamp: new Date(),
        data: []
    };

    return db.insertDocument('answers', newAnswer);
};

const baseSurvey = async (req, res, status, answer) => {
    if (status === 0) {
        const oldAnswer = await db.getDocument('answers', {_id: answer});
        if (oldAnswer.length !==0 && oldAnswer[0].data.length === 0) db.deleteDocument('answers', {_id: answer});
            db.updateDocument('status', {user: req.body.email}, {answer: await resetAnswer(req.body.email)});
    }
    else if (status === 1) {
        db.deleteDocument('answers', {_id: answer});
    }
    else if (status === 2) {
        console.log(2);
    }
    res.status(200).send(baseArray[status]);
};

const submitForm = (req, res) => {

};

const processAnswer = (req, res) => {
    cache.get(req.body.email)
    .then(async result => {
        // If user not in cache
        if (typeof result === 'undefined') res.status(404).send();
        else {
            // Immediate Feedback
            feedback.immediateFeedback();
            // Differenciated Feedback
            feedback.diffFeedback();
            // Database storage
            console.log(req.body);

            dbStorage.storeAnswer(req);
            
            const status = await db.getDocument('status', {user: req.body.email});
            
            const newStatus = getNewStatus(status[0].base, req.body.answer);

            db.updateDocument('status', {user: req.body.email}, {base: newStatus});

            res.status(200).send({status: newStatus});
        }
    });
};

const getNewStatus = (oldStatus, answer) => {

    let other;

    if (oldStatus === 0) {
        if (answer[0].value === false) return 1;
        else return 2;
    }
    if (oldStatus === 1) {
        return 0;
    }
    else if (oldStatus === 2) {
        if (answer[0].value === false) return 3;
        else return 4;
    }
    else if (oldStatus === 3) {
        if (answer[0].value === false) return 4;
        else return 5;
    }
    else if (oldStatus === 4) {
        return 6;
    }
    else if (oldStatus === 5) {
        return 4;
    }
    else if (oldStatus === 6) {
        other = false;
        answer[0].value.map(a => {
            if (a === 'other') other = true;
        });

        if (other == true) return 9;
        else return 7;
    }
    else if (oldStatus === 7) {
        other = false;
        answer[0].value.map(a => {
            if (a === 'other') other = true;
        });

        if (other == true) return 10;
        else return 8;
    }
    else if (oldStatus === 8) {
        other = false;
        answer[0].value.map(a => {
            if (a === 'other') other = true;
        });

        if (other == true) return 11;
        else return 12;
    }
    else if (oldStatus === 9) {
        return 7;
    }
    else if (oldStatus === 10) {
        return 8;
    }
    else if (oldStatus === 11) {
        return 12;
    }
    else if (oldStatus === 12) {
        return 0;
    }

};

const returnFeedback = (req, res) => {

};

exports.getForm = getForm;
exports.submitForm = submitForm;
exports.processAnswer = processAnswer;
exports.returnFeedback = returnFeedback;