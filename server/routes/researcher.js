// Imports
var express = require('express');
var router = express.Router();

const researcherExtension = require('../extension/researcherExtension');

router.post('/getData', async (req, res) => {
    researcherExtension.getData(req, res);
});

router.post('/editData', async (req, res) => {
    researcherExtension.editData(req, res);
});

router.post('/removeData', async (req, res) => {
    researcherExtension.removeData(req, res);
});

router.post('/validateData', async (req, res) => {
    researcherExtension.validateData(req, res);
});


// Export router
module.exports = router;