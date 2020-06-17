// Imports
var express = require('express');
var router = express.Router();

const surveyExtension = require('../extension/surveysExtension');

router.post('/', async (req, res) => {
    surveyExtension.getForm(req, res);
});

router.post('/submit', async (req, res) => {
    surveyExtension.submitForm(req, res);
});

router.post('/answer', async (req, res) => {
    surveyExtension.processAnswer(req, res);
});

router.post('/feedback', async (req, res) => {
    surveyExtension.returnFeedback(req, res);
});

router.post('/getMarkers', async (req, res) => {
    surveyExtension.getMarkers(req, res);
});

// Export router
module.exports = router;