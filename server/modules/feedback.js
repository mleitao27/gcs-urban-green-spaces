    
/* 
 * feedbackExtension
 * Description : Handles feedback both immediate and differenciated
 */

// Imports
const feedbackArray = require('../extension/feedback/feedbackArray');

// Sends immeadiate feedback to the users answer
const immediate = (req, res) => {
    feedbackArray.feedbacks.immediate(req, res);
};

// Call differenciated feedback modules that can will
// deliver feed back to the user after doing some processing
const differenciated = (req, res) => {
    feedbackArray.feedbacks.differenciated.map(feedback => {
        feedback.module(req, res);
    });
};

// Export functions
exports.immediate = immediate;
exports.differenciated = differenciated;