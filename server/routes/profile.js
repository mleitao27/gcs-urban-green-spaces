/* 
 * profile (Router)
 * Description : Contains all the endpoints that handle requests
 * related to the user's profile in the mobile app. Allows to get
 * and edit the profile.
 */

// Imports
var express = require('express');
var router = express.Router();

// Import profile extension functions
const profileExtension = require('../extension/profileExtension');

// Get user profile
router.post('/', async (req, res) => {
    profileExtension.getProfile(req, res);
});

// Request to edit user's profile
router.post('/editRequest', async (req, res) => {
    profileExtension.editProfileRequest(req, res);
});

// Edit user's profile (submit changes)
router.post('/edit', async (req, res) => {
    profileExtension.editProfile(req, res);
});

// Export router
module.exports = router;