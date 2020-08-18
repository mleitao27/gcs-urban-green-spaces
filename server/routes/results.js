/* 
 * results (Router)
 * Description : Contains all the endpoints that handle requests
 * related to the results screen in the mobile application.
 */

// Imports
var express = require('express');
var router = express.Router();

// Import results extension functions
const resultsExtension = require('../extension/resultsExtension');

// Get results
router.post('/', async (req, res) => {
    resultsExtension.getResults(req, res);
});

// Export router
module.exports = router;