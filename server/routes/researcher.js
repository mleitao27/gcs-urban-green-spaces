// Imports
var express = require('express');
var router = express.Router();

const researcherExtension = require('../extension/researcherExtension');

router.post('/getUGS', async (req, res) => {
    researcherExtension.getUGS(req, res);
});

router.post('/editUGS', async (req, res) => {
    researcherExtension.editUGS(req, res);
});

router.post('/removeUGS', async (req, res) => {
    researcherExtension.removeUGS(req, res);
});

router.post('/validateUGS', async (req, res) => {
    researcherExtension.validateUGS(req, res);
});


// Export router
module.exports = router;