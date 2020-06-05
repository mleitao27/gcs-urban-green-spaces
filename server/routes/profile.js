// Imports
var express = require('express');
var router = express.Router();

const profileExtension = require('../extension/profileExtension');

router.post('/', async (req, res) => {
    profileExtension.getProfile(req, res);
});

router.get('/edit', async (req, res) => {
    profileExtension.editProfileGET(req, res);
});

router.post('/edit', async (req, res) => {
    profileExtension.editProfilePOST(req, res);
});


// Export router
module.exports = router;