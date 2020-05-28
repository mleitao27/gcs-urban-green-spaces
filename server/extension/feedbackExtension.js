var express = require('express');
const diffFeedbacksArray = require('./diffFeedback/diffFeedbacksArray');

const immediateFeedback = () => {
    console.log('immediateFeedback');
};

const diffFeedback = () => {
    console.log('diffFeedback');
    diffFeedbacksArray.feedbacks.map(feedback => {
        feedback.module();
    });
};

exports.immediateFeedback = immediateFeedback;
exports.diffFeedback = diffFeedback;