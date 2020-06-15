// Imports
var express = require('express');
var router = express.Router();

const profileExtension = require('../extension/profileExtension');

router.post('/', async (req, res) => {
    profileExtension.getProfile(req, res);
});

router.post('/requestEdit', async (req, res) => {
    profileExtension.requestEditProfile(req, res);
});

router.post('/edit', async (req, res) => {
    profileExtension.editProfile(req, res);
});


// Export router
module.exports = router;