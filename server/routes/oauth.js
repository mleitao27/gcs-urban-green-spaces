/* 
 * oauth (Router)
 * Description : Contains all the endpoints that handle requests
 * related to oauth authentication.
 */

// Imports
var express = require('express');
var router = express.Router();

// Import oauth extension functions
const oauthExtension = require('../extension/oauthExtension.js');

// Login user with oauth
router.post('/login', async (req, res) => {
    oauthExtension.loginHandler(req, res);
  });

// Register user with oauth
router.post('/register', async (req, res) => {
    oauthExtension.registerHandler(req, res);
  });

// Export router
module.exports = router;