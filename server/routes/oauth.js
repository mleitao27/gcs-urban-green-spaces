// Imports
var express = require('express');
var router = express.Router();

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