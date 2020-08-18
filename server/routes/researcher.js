/* 
 * researcher (Router)
 * Description : Contains all the endpoints that handle requests
 * related to researcher's console. Allow to get, edit, remove or
 * validate system data.
 */

// Imports
var express = require('express');
var router = express.Router();

// Import researcher extension functions
const researcherExtension = require('../extension/researcherExtension');

// Get some data for the researcher's console
router.post('/getData', async (req, res) => {
    researcherExtension.getData(req, res);
});

// Edit some data from the researcher's console
router.post('/editData', async (req, res) => {
    researcherExtension.editData(req, res);
});

// Remove some system data from the researcher's console
router.post('/removeData', async (req, res) => {
    researcherExtension.removeData(req, res);
});

// Validate som data from the researcher's console
router.post('/validateData', async (req, res) => {
    researcherExtension.validateData(req, res);
});


// Export router
module.exports = router;